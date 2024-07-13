import React from "react";
import type { Metadata } from "next";

import { redirect } from "next/navigation";

import { Navbar } from "@/components/shared";
import { auth } from "@/libs/auth";
import { BRAND } from "@/constants";

export const metadata: Metadata = {
  title: BRAND,
  description: "Crea, acorta y centraliza tus links en un solo lugar!",
};

export default async function MePageLayout({ children }: { children: any }) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      {React.Children.map(children, (child, index) => (
        <section key={`me-layout-child:${index + 1}`} className={"section"}>
          {child}
        </section>
      ))}
    </>
  );
}
