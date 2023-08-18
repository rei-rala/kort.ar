"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import LogInOptions from "@/components/LogInOptions/LogInOptions";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session?.user) {
    redirect("/me/dashboard");
  }

  return session ? <b>Already logged in, redirecting 😊</b> : <LogInOptions />;
}
