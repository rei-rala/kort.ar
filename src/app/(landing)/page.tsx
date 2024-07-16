import type { Metadata } from "next/types";

import { LandingHeader } from "./landingComponents/landingHeader/LandingHeader";
import { LandingBody } from "./landingComponents/landingBody/LandingBody";
import { LandingFooter } from "./landingComponents/landingFooter/LandingFooter";
import { BRAND } from "@/constants";

import styles from "./landing.module.css";

export const metadata: Metadata = {
  title: BRAND,
  description: `${BRAND}, la plataforma para acortar y compartir enlaces`,
};

export default function HomePage() {
  return (
    <div className={styles.landing}>
      <LandingHeader />
      <LandingBody />
      <LandingFooter />
    </div>
  );
}
