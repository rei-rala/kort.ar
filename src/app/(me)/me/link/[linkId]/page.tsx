import authOptions from "@/libs/nextAuth";
import { AuthenticatedSession, getServerSession } from "next-auth";
import { getLinkById } from "@/services/testLinks";

import { notFound } from "next/navigation";
import GoBackLink from "@/components/shared/GoBackLink/GoBackLink";

export default async function MeLinkPage(req: LinkPageReq) {
  const session = (await getServerSession(authOptions)) as AuthenticatedSession;
  const link = await getLinkById(req.params.linkId);

  if (session.user.email !== link?.owner.email) {
    notFound();
  }

  return (
    <>
      <main>
        <nav>
          <GoBackLink title="dashboard" />
        </nav>
        <main>
          <pre>{JSON.stringify(link, null, 2)}</pre>
        </main>
      </main>
    </>
  );
}
