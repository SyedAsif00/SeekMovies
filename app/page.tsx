import React from "react";
import { redirect } from "next/navigation";
import Approutes from "./_lib/AppRoutes";
export default function Home() {
  redirect(Approutes.Movies);
}
