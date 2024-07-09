import { LinkLayout } from "@/layouts";
import type { Metadata } from "next";

import styles from "./linkLayout.module.css";

const title = "" + process.env.BRAND;

export const metadata: Metadata = {
  title,
  description: "Crea, acorta y centraliza tus links en un solo lugar!",
};

export default function LinkPageLayout({ children }: { children: any }) {
  return (
    <LinkLayout className={styles.content} customBrand={title}>
      <span>{children}</span>
    </LinkLayout>
  );
}
