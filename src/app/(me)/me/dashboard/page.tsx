import authOptions from "@/libs/nextAuth";
import { getServerSession } from "next-auth";

export default async function MeDashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <p>Hola {session!.user!.name}!</p>
      <h1>Dashboard</h1>
    </main>
  );
}
