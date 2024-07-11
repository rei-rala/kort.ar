import { auth } from "@/libs/auth";
import { redirect } from "next/navigation";

export default async function MeSettingsPage() {
  const session = await auth();


  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <main>
      {session?.user?.name && <code>{session.user.name}</code>}
      <h1>Settings</h1>
      <p>Ajustes</p>
    </main>
  );
}
