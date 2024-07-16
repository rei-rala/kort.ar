import type { Metadata } from "next/types";

import { LandingHeader } from "./landingComponents/landingHeader/LandingHeader";
import { BRAND } from "@/constants";

import styles from "./landing.module.css";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: BRAND,
  description: `${BRAND}, la plataforma para acortar y compartir enlaces`,
};

const Loading = () => <i>Loading...</i>;

const LandingBodyLazy = React.lazy(() =>
  import("./landingComponents/landingBody/LandingBody").then((module) => ({
    default: module.LandingBody,
  }))
);
const LandingFooterLazy = React.lazy(() =>
  import("./landingComponents/landingFooter/LandingFooter").then((module) => ({
    default: module.LandingFooter,
  }))
);

export default function HomePage() {
  return (
    <div className={styles.landing}>
      <LandingHeader />

      <Suspense fallback={<Loading />}>
        <LandingBodyLazy />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <LandingFooterLazy />
      </Suspense>
    </div>
  );
}
