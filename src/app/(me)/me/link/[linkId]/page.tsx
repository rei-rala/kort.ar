import authOptions from "@/libs/nextAuth";
import { AuthenticatedSession, getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getLinkById } from "@/services/testLinks";

import GoBackLinkAnimated from "@/components/pages/me/GoBackLinkAnimated/GoBackLinkAnimated";

export default async function MeLinkPage(req: LinkPageReq) {
  const session = (await getServerSession(authOptions)) as AuthenticatedSession;
  const link = await getLinkById(req.params.linkId);

  if (session.user.email !== link?.owner.email) {
    notFound();
  }

  return (
    <>
      <GoBackLinkAnimated />
      <main>
        <main>
          <pre>{JSON.stringify(link, null, 2)}</pre>
        </main>
      </main>
    </>
  );
}
