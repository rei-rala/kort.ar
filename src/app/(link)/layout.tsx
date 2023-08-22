import LinkLayoutComponents from "@/components/_layouts/link/LinkLayoutComponents";
import type { Metadata } from "next";

import styles from "./linkLayout.module.css";

const title = "" + process.env.BRAND;

export const metadata: Metadata = {
  title,
  description: "Crea, acorta y centraliza tus links en un solo lugar!",
};

export default function LinkLayout({ children }: { children: any }) {
  return (
    <LinkLayoutComponents className={styles.content} customBrand={title}>
      <span>{children}</span>
    </LinkLayoutComponents>
  );
}
