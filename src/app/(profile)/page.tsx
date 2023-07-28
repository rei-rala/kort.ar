"use client";

import { Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();
  return (
    <main>
      <div>
        <code>{status}</code>
        <code>
          <pre>{JSON.stringify(data, null, "\t")}</pre>
        </code>
        <Button onClick={() => signIn("google")}>Iniciar sesion con google</Button>
        <Button onClick={() => signOut()}>Cerrar sesion</Button>
      </div>
    </main>
  );
}
