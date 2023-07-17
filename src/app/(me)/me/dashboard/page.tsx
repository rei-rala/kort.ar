"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Hola {session.user.name}!</p>
    </main>
  );
}
