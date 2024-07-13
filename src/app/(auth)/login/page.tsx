import { redirect } from "next/navigation";
import { LogInOptions } from "./LogInOptions";
import { auth } from "@/libs/auth";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/me");
  }

  return session?.user ? <b>Already logged in, redirecting 😊</b> : <LogInOptions />;
}
