import React from "react";
import type { Metadata } from "next";

import { ProfileLayout } from "@/layouts";
import { BRAND } from "@/constants";

export const metadata: Metadata = {
  title: BRAND,
  description: "Crea, acorta y centraliza tus links en un solo lugar!",
};

export default function ProfilePageLayout({ children }: { readonly children: React.ReactNode }) {
  return <ProfileLayout>{children}</ProfileLayout>;
}
