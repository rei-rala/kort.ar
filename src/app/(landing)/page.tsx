"use client";

import { Navbar } from "@/components/shared";
import { getAllRedirectLinks } from "@/services/redirectLink.services";
import { Link, Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { LandingHeader } from "./landingComponents/landingHeader/LandingHeader";

export default function HomePage() {
  const { data, status } = useSession();

  const [hide, setHide] = useState(true);
  const [redirectLinks, setRedirectLinks] = useState<RedirectLink[]>([]);

  useEffect(() => {
    if (!status || status !== "authenticated") return;

    const fetchData = async () => {
      const { data } = await getAllRedirectLinks();
      setRedirectLinks((data || []) as RedirectLink[]);
    };
    fetchData();
  }, [status]);

  return (
    <>
      <LandingHeader />
      <section className="section">
        <section>
          <h2>Mostrando session en home [client component]</h2>
          <Button onClick={() => setHide(!hide)}>
            {hide ? "Mostrar navbar" : "Ocultar navbar"}
          </Button>
        </section>
        <div>
          <code>{status}</code>
          <code>
            <pre>{JSON.stringify(data, null, "\t")}</pre>
          </code>

          <Link href="/login">Login page</Link>
          <Link href="/home">Dashboard</Link>
          <Button onClick={() => signIn("google")}>Login</Button>
          <Button onClick={() => signOut()}>Logout</Button>
        </div>
        <code>
          {redirectLinks.map((redirectLink) => (
            <pre key={redirectLink.id}>{JSON.stringify(redirectLink, null, "\t")}</pre>
          ))}
        </code>
      </section>
    </>
  );
}
