"use client";

import React, { useEffect, useState } from "react";
import { Featured } from "./featured/featured";
import { suspenseFetch } from "@/services";
import { getFeaturedLinkAndProfile } from "@/services/featured.services";

import styles from "./landingBody.module.css";
import { BRAND } from "@/constants";
import { Typography } from "@mui/material";

const featuredResource = suspenseFetch(getFeaturedLinkAndProfile());

export const LandingBody = () => {
  const [featuredData, setFeaturedData] = useState<Featured | null>(null);

  useEffect(() => {
    const fetchData = () => {
      const { data } = featuredResource.read();
      setFeaturedData(data);
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

        <Featured featured={featuredData} />
      </section>
    </section>
  );
};
