"use client";

import { Link, Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";

export default function HomePage() {
  const { data, status } = useSession();
  return (
    <main>
      <h2>Mostrando session en home [client component]</h2>
      <div>
        <code>{status}</code>
        <code>
          <pre>{JSON.stringify(data, null, "\t")}</pre>
        </code>
        <Link href="/auth/login">Login page</Link>
        <Link href="/me">Dashboard</Link>
        <Button onClick={() => signIn("google")}>Login</Button>
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
    </main>
  );
}
