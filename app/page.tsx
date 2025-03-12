import { redirect } from "next/navigation";
import Approutes from "./_lib/AppRoutes";
import "@/app/_styles/globals.css";
export default function Home() {
  redirect(Approutes.Movies);
}
