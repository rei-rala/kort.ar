import React from "react";
import { BRAND } from "@/constants";
import { Featured } from "./featured/featured";
import { Typography } from "@mui/material";

import styles from "./landingBody.module.css";

export const LandingBody = () => {
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

        <Featured />
      </section>
    </section>
  );
};
