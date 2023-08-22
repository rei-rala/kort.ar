import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import LogInOptions from "@/components/LogInOptions/LogInOptions";
import { getServerSession } from "next-auth";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  return session ? <b>Already logged in, redirecting 😊</b> : <LogInOptions />;
}
