import authOptions from "@/libs/nextAuth";
import { AuthenticatedSession, getServerSession } from "next-auth";

import { LinkForm } from "@/components/me/linkForm/LinkForm";
import ReturnUrlLink from "@/components/shared/ReturnUrlLink";
import { redirect } from "next/navigation";

export default async function NewLinkPage() {
  const session = (await getServerSession(authOptions)) as AuthenticatedSession;

  if (!session) {
    return redirect("/login");
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
