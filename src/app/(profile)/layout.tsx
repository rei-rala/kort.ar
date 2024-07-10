import React from "react";
import type { Metadata } from "next";

import { ProfileLayout } from "@/layouts";

const title = process.env.BRAND;

export const metadata: Metadata = {
  title,
  description: "Crea, acorta y centraliza tus links en un solo lugar!",
};

export default function ProfilePageLayout({ children }: { children: any }) {
  return <ProfileLayout>{children}</ProfileLayout>;
}
