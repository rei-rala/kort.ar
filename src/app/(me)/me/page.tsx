import { getLinksByEmail } from "@/services/testLinks";

import Typography from "@mui/material/Typography/Typography";
import { LinkManager } from "@/components/me";
import { TabsWithPanels } from "@/components/shared";
import { auth } from "@/libs/auth";
import { AuthenticatedSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function MeDashboardPage() {
  const session = (await auth()) as AuthenticatedSession;

  if (!session || !session.user) {
    redirect("/auth/login");
  }
  const links = await getLinksByEmail(session.user.email);

  let testPanels = [
    {
      label: "Tus links",
      children: <LinkManager links={links} />,
    },
    {
      label: "Segunda",
      children: <p>2</p>,
    },
    {
      label: "Tercera(disabled)", // no children also disables the tab
    },
    {
      label: "Cuarta",
      children: "pero claro que si",
    },
  ];

  return (
    <main>
      <Typography variant="h4" component="h2">
        Dashboard
      </Typography>
      <Typography variant="body1">
        En esta sección, podrás administrar tus links y otras opciones relacionadas a tu perfil
      </Typography>

      <TabsWithPanels tabId="dashboard-tabs" panels={testPanels} />
    </main>
  );
}
