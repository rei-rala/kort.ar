import type { Metadata } from "next/types";

import { BRAND } from "@/constants";
import styles from "./landing.module.css";

export const metadata: Metadata = {
  title: BRAND,
  description: `${BRAND}, la plataforma para acortar y compartir enlaces`,
  icons: [
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon/kortar.png",
    },
  ],
};

const RootLayout: DefaultComponent = ({ children }) => {
  return <div className={styles.landing}>{children}</div>;
};

export default RootLayout;
