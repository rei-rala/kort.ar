import React from "react";
import { Rubik } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

import AuthLayoutComponents from "@/components/_layouts/auth/AuthLayoutComponents";
import styles from "./layout.module.css";

const rubik = Rubik({ subsets: ["latin"] });

export default async function AuthLayout({ children }: { children: any }) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/me/dashboard");
  }

  return (
    <AuthLayoutComponents>
      <h1 className={`${rubik.className} ${styles.brand}`}>{process.env.BRAND}</h1>
      {children}
    </AuthLayoutComponents>
  );
}
