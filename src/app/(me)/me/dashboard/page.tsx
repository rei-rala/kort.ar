import { TabsWithPanels } from "@/components/shared";
import authOptions from "@/libs/nextAuth";
import { getServerSession } from "next-auth";

let testPanels = [
  {
    label: "Primera",
    children: <p>123</p>,
  },
  {
    label: "Segunda",
    children: <p>2</p>,
  },
  {
    label: "Tercera(disabled)", // no children disables the tab
  },
  {
    label: "Cuarta",
    children: "pero claro que si",
  },
];

export default async function MeDashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <p>Hola {session!.user!.name}!</p>
      <h1>Dashboard</h1>
      <TabsWithPanels tabId="dashboard-tabs" panels={testPanels} />
    </main>
  );
}
