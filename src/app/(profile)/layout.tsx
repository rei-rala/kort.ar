import React from "react";
import { Rubik } from "next/font/google";
import type { Metadata } from "next";

import ProfileLayoutComponents from "@/components/_layouts/profile/ProfileLayoutComponents";

const rubik = Rubik({ subsets: ["latin"] });
const title = process.env.BRAND;

export const metadata: Metadata = {
  title,
  description: "Crea, acorta y centraliza tus links en un solo lugar!",
};

export default function SiteLayout({ children }: { children: any }) {
  return <ProfileLayoutComponents brandFont={rubik.className}>{children}</ProfileLayoutComponents>;
}
