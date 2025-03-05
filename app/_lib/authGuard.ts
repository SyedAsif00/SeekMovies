import { redirect } from "next/navigation";
import { isAuthenticated } from "@/app/_store/useAuthStore";

export const authGuard = () => {
  if (!isAuthenticated()) {
    redirect("/auth/login"); // Redirect to login if not authenticated
  }
};
