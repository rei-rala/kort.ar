import authOptions from "@/libs/nextAuth";
import { AuthenticatedSession, getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getLinkById } from "@/services/testLinks";

import LinkForm from "@/components/me/linkForm/LinkForm";
import ReturnUrlLink from "@/components/shared/ReturnUrlLink";

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
          <ReturnUrlLink title="dashboard" />
        </nav>
      </section>
      <main>
        <main>
          <pre>{JSON.stringify(link, null, 2)}</pre>
        </main>
        <LinkForm link={link} />
      </main>
    </>
  );
}
