import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Hola {session!.user!.name}!</p>
    </main>
  );
}
