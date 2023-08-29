import authOptions from "@/libs/nextAuth";
import { AuthenticatedSession, getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getLinkById } from "@/services/testLinks";

import LinkForm from "@/components/pages/me/linkForm/LinkForm";
import GoBackLink from "@/components/shared/GoBackLink/GoBackLink";

export default async function MeLinkPage(req: LinkPageReq) {
  const session = (await getServerSession(authOptions)) as AuthenticatedSession;
  const link = await getLinkById(req.params.linkId);

  if (session.user.email !== link?.owner.email) {
    notFound();
  }

  return (
    <>
      <section>
        <nav>
          <GoBackLink title="dashboard" />
        </nav>
      </section>
      <main>
        <main>
          <pre>{JSON.stringify(link, null, 2)}</pre>
        </main>
        <LinkForm />
      </main>
    </>
  );
}
