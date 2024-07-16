import { Link } from "@mui/material";
import { LandingHeader } from "./landingComponents/landingHeader/LandingHeader";

import { auth } from "@/libs/auth";

export default async function HomePage() {
  return (
    <>
      <LandingHeader />
      <section className="section">
        <main>
          <h2>Mostrando session en home [client component]</h2>
        </main>
        <div>
          <code>

          </code>

          <Link href="/login">Login page</Link>
          <Link href="/home">Dashboard</Link>
          {/* <Button onClick={() => signIn("google")}>Login</Button> */}
          {/* <Button onClick={() => signOut()}>Logout</Button> */}
        </div>
        <code>
          {/* {redirectLinks.map((redirectLink) => (
            <pre key={redirectLink.id}>{JSON.stringify(redirectLink, null, "\t")}</pre>
          ))} */}
        </code>
      </section>
    </>
  );
}
