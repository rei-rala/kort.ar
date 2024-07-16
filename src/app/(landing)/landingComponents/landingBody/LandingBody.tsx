"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Featured } from "./featured/featured";
import { getFeaturedLinkAndProfile } from "@/services/featured.services";

import styles from "./landingBody.module.css";
import { BRAND } from "@/constants";
import { Typography } from "@mui/material";
import { FeaturedSkeleton } from "./featured/featuredSkeleton";

export const LandingBody = () => {
  const [featuredData, setFeaturedData] = useState<Featured | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getFeaturedLinkAndProfile();
        setFeaturedData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.landingBody}>
      <section className={styles.container}>
        <div className={styles.content}>
          <Typography variant="h4" align="center">
            Comparte tus enlaces de manera fácil y rápida
          </Typography>

          <Typography variant="h6" align="center">
            {BRAND} te permite crear enlaces cortos y personalizados para compartir tus contenidos
            en redes sociales, correo electrónico o cualquier otra plataforma.
          </Typography>
        </div>

        <Suspense fallback={<FeaturedSkeleton />}>
          <Featured featured={featuredData} />
        </Suspense>
      </section>
    </section>
  );
};
