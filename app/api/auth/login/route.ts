import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/app/_lib/prisma";
const JWT_SECRET = process.env.JWT_SECRET; // Use an env variable in production

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    console.log("Login attempt for:", email);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("User not found:", email);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare password with stored hash
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log("Invalid password for:", email);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d", // Token valid for 7 days
    });

    console.log("Login successful, token generated for:", email);

    // Set token in HTTP-only cookie (for security)
    const response = NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
    response.headers.append(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Secure`
    );

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
