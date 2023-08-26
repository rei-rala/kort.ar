import authOptions from "@/libs/nextAuth";
import { AuthenticatedSession, getServerSession } from "next-auth";
import { getLinkById } from "@/services/testLinks";

import { notFound } from "next/navigation";

export default async function MeDashboardPage(req: LinkPageReq) {
  const session = (await getServerSession(authOptions)) as AuthenticatedSession;
  const link = await getLinkById(req.params.link);

  if (session.user.email !== link?.owner.email) {
    notFound();
  }

  return (
    <main>
      <pre>{JSON.stringify(link, null, 2)}</pre>
    </main>
  );
}
