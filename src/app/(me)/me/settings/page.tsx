import authOptions from "@/libs/nextAuth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      {session?.user?.name && <code>{session.user.name}</code>}
      <h1>Settings</h1>
      <p>Ajustes</p>
    </main>
  );
}
