import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/_styles/globals.css";
import AppLayout from "./_components/AppLayout";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../app/_lib/queryClient";

export const metadata: Metadata = {
  title: "Movie Search App",
  description:
    "Movie Search App with stunning User interfaces to search for movies and book mark them when needed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <QueryClientProvider client={queryClient}> */}
        <AppLayout>{children}</AppLayout>
        {/* </QueryClientProvider> */}
      </body>
    </html>
  );
}
