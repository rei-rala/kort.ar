import React, { Suspense } from "react";
import type { Metadata } from "next";

import { redirect } from "next/navigation";

import { auth } from "@/libs/auth";
import { BRAND } from "@/constants";

const NavbarLazy = React.lazy(() =>
  import("@/components/shared").then((module) => ({
    default: module.Navbar,
  }))
);

export const metadata: Metadata = {
  title: BRAND,
  description: "Crea, acorta y centraliza tus links en un solo lugar!",
};

export default async function MePageLayout({ children }: { readonly children: React.ReactNode }) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <>
      <Suspense>
        <NavbarLazy />
      </Suspense>
      {React.Children.map(children, (child, index) => (
        <section key={`me-layout-child:${index + 1}`} className={"section"}>
          {child}
        </section>
      ))}
    </>
  );
}
