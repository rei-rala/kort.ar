"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();
  return (
    <main>
      <code>{status}</code>
      <code>
        <pre>{JSON.stringify(data, null, "\t")}</pre>
      </code>
      <button onClick={() => signIn("google")}>Iniciar sesion con google</button>
      <button onClick={() => signOut()}>Cerrar sesion</button>
    </main>
  );
}
