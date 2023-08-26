import authOptions from "@/libs/nextAuth";
import { AuthenticatedSession, getServerSession } from "next-auth";
import { getLinkByOrigin } from "@/services/testLinks";

import { redirect } from "next/navigation";

export default async function MeDashboardPage(req: LinkPageReq) {
  const session = (await getServerSession(authOptions)) as AuthenticatedSession;
  const link = await getLinkByOrigin(req.params.link);

  if (session.user.email !== link?.owner.email) {
    redirect("/400");
  }

  return (
    <main>
      <pre>{JSON.stringify(link, null, 2)}</pre>
    </main>
  );
}
