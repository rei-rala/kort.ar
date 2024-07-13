import React from "react";
import { redirect } from "next/navigation";

import { AuthLayout } from "@/layouts";
import styles from "./layout.module.css";
import { auth } from "@/libs/auth";
import { BRAND } from "@/constants";

export default async function AuthPageLayout({ children }: { children: any }) {
  const session = await auth();

  if (session?.user) {
    redirect("/me");
  }

  return (
    <AuthLayout>
      <h1 className={styles.brand}>{BRAND}</h1>
      {children}
    </AuthLayout>
  );
}
