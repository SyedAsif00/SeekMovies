import React from "react";
import { redirect } from "next/navigation";
import Approutes from "./_lib/AppRoutes";
import "@/app/_styles/global.css";
export default function Home() {
  redirect(Approutes.Movies);
}
