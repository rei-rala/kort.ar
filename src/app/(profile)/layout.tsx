import React from "react";
import { Rubik } from "next/font/google";

import Navbar from "@/components/layout/DefaultNavbar";

const rubik = Rubik({ subsets: ["latin"] });
const title = process.env.BRAND;

export const metadata = {
  title,
  description: "Crea, acorta y centraliza tus links en un solo lugar!",
};

export default function SiteLayout({ children }: { children: any }) {
  return (
    <React.Fragment>
      <Navbar brandFont={rubik.className} />
      {children}
    </React.Fragment>
  );
}
