import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import authOptions from "@/libs/nextAuth";

import { AuthLayout } from "@/layouts";
import styles from "./layout.module.css";

export default async function AuthPageLayout({ children }: { children: any }) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/me");
  }

  return (
    <AuthLayout>
      <h1 className={styles.brand}>{process.env.BRAND}</h1>
      {children}
    </AuthLayout>
  );
}
