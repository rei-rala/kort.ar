"use client";

import { getLinks } from "@/services/testLinks";
import { Link, Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { data, status } = useSession();

  const [redirectLinks, setRedirectLinks] = useState<RedirectLink[]>([]);

  useEffect(() => {
    if (!status || status !== "authenticated") return;

    const fetchData = async () => {
      const result = await getLinks();
      setRedirectLinks(result);
    };
    fetchData();
  }, [status]);

  return (
    <main>
      <h2>Mostrando session en home [client component]</h2>
      <div>
        <code>{status}</code>
        <code>
          <pre>{JSON.stringify(data, null, "\t")}</pre>
        </code>

        <Link href="/login">Login page</Link>
        <Link href="/me">Dashboard</Link>
        <Button onClick={() => signIn("google")}>Login</Button>
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
      <code>
        {redirectLinks.map((redirectLink) => (
          <pre key={redirectLink.id}>{JSON.stringify(redirectLink, null, "\t")}</pre>
        ))}
      </code>
    </main>
  );
}
