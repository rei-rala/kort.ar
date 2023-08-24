import React from "react";
import { Rubik } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import authOptions from "@/libs/nextAuth";

import { AuthLayout } from "@/components/layouts";
import styles from "./layout.module.css";

const rubik = Rubik({ subsets: ["latin"] });

export default async function AuthPageLayout({ children }: { children: any }) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/me/dashboard");
  }

  return (
    <AuthLayout>
      <h1 className={`${rubik.className} ${styles.brand}`}>{process.env.BRAND}</h1>
      {children}
    </AuthLayout>
  );
}
