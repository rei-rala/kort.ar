import { AuthenticatedSession } from "next-auth";

import { LinkForm } from "@/components/me/linkForm/LinkForm";
import ReturnUrlLink from "@/components/shared/ReturnUrlLink";
import { redirect } from "next/navigation";
import { auth } from "@/libs/auth";

export default async function NewLinkPage() {
  const session = await auth();


  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <>
      <nav>
        <ReturnUrlLink title="dashboard" url="/me" />
      </nav>
      <main>
        <LinkForm />
      </main>
    </>
  );
}
