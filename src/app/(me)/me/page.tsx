import Typography from "@mui/material/Typography/Typography";
import { TabsWithPanels } from "@/components/shared";
import { auth } from "@/libs/auth";
import { redirect } from "next/navigation";
import { BtnTest } from "./BtnTest";
import { MyLinksTab } from "./MyLinksTab";

export default async function MeDashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  let testPanels = [
    {
      label: "Tus links",
      children: <MyLinksTab />,
    },
    {
      label: "Segunda",
      children: <BtnTest />,
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
