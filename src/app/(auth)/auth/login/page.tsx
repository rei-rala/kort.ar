import authOptions from "@/libs/nextAuth";
import { LogInOptions } from "@/components/shared";
import { getServerSession } from "next-auth";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  return session ? <b>Already logged in, redirecting 😊</b> : <LogInOptions />;
}
