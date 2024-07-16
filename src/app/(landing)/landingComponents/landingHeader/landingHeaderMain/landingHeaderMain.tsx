"use client";
import { useSession } from "next-auth/react";
import { ForwardedRef, forwardRef } from "react";
import { Box, Button, Input, InputLabel, Link, Typography } from "@mui/material";
import { BRAND } from "@/constants";

import { cn } from "@/utils/classnames";
import styles from "./landingHeaderMain.module.css";

export const LandingMain = forwardRef(
  ({ isNavbarVisible, ...props }: any, ref: ForwardedRef<HTMLElement>) => {
    const { data: session } = useSession();

    return (
      <main
        className={cn(styles.landingMain, styles.animated, !isNavbarVisible && styles.darken)}
        ref={ref}
      >
        <Box {...props} className={styles.container}>
          <div className={styles.content}>
            <div>
              <Typography variant="subtitle2" component="h1">
                Bienvenido {session?.user?.name ?? "invitado"}!
                {session?.user && <Button href="/home">Ir a Dashboard</Button>}
                {!session?.user && <Button href="/api/auth/signin">Iniciar sesión</Button>}
              </Typography>
            </div>
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
        </Box>
      </main>
    );
  }
);

LandingMain.displayName = "LandingMain";
