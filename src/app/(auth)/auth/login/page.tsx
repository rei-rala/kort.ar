"use client";

import type { Metadata } from "next/types";
import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@mui/material";

export default function LoginPage() {
  const { data: session } = useSession();

  function handleLoginChrome() {
    signIn("google");
  }

  if (session?.user) {
    redirect("/me/dashboard");
  }

  return (
    <>
      <Button variant="contained" color="primary" size="large" onClick={handleLoginChrome}>
        Iniciar sesion con google
      </Button>
    </>
  );
}
