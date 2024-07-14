"use client";
import { ForwardedRef, forwardRef, Suspense } from "react";
import { Box, Button, Input, InputLabel, Typography } from "@mui/material";

import styles from "./landingHeaderMain.module.css";
import { BRAND } from "@/constants";
import { cn } from "@/utils/classnames";
import { Featured } from "./_featured";
import { getFeaturedLinkAndProfile } from "@/services/featured.services";
import { suspenseFetch } from "@/services";

const featuredResource = suspenseFetch(getFeaturedLinkAndProfile());

const FeaturedContent = () => {
  const { data: featured } = featuredResource.read();
  return <Featured featured={featured} />;
};

export const LandingMain = forwardRef(
  ({ isNavbarVisible, ...props }: any, ref: ForwardedRef<HTMLElement>) => {
    return (
      <main
        className={cn(styles.landingMain, styles.animated, !isNavbarVisible && styles.darken)}
        ref={ref}
      >
        <Box {...props} className={styles.container}>
          <div className={styles.content}>
            {/* Contenido principal */}
            <div className={cn(styles.contentInner, styles.shadowed)}>
              <Typography variant="h3" component="h2">
                Crea y comparte enlaces cortos con <strong>{BRAND}</strong>
              </Typography>
              <Typography variant="h5">
                Soy una aplicación que permite crear enlaces cortos y perfiles con enlaces
                personalizados para compartir tus contenidos de manera fácil y rápida.
              </Typography>
            </div>
            <div className={cn(styles.contentInner, styles.shadowed)}>
              <Typography variant="h6" component="h3">
                Crea tu enlace
              </Typography>
              <div className={styles.actionContainer}>
                <InputLabel>
                  <Typography>Redirigir hacia </Typography>
                  <Input type="text" placeholder="https://www.google.com.ar/search?q=kort.ar" />
                </InputLabel>
                <Button variant="contained">Crear</Button>
              </div>
            </div>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <FeaturedContent />
          </Suspense>
        </Box>
      </main>
    );
  }
);

LandingMain.displayName = "LandingMain";
