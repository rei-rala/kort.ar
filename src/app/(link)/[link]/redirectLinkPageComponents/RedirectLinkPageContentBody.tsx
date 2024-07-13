"use client";
import { ExternalLink } from "@/components/shared";
import { hexToRgba } from "@/utils/text";
import { Link, Tooltip } from "@mui/material";

import { Button, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { useState } from "react";

import styles from "./redirectLinkPageComponents.module.css";

export const RedirectSection = ({ to }: { to: string }) => {
  const [countDown, setCountDown] = useState(5);
  const [canceled, setCanceled] = useState(false);
  const buttonText = canceled
    ? "Redirección cancelada"
    : countDown
    ? `Redireccionando en ${countDown}`
    : `Redireccionando...`;

  const cancelRedirect = () => {
    setCanceled(true);
  };

  if (!canceled && countDown > 0) {
    setTimeout(() => {
      setCountDown((prev) => (prev - 1 > 0 ? prev - 1 : 0));
    }, 1000);
  }

  if (countDown < 0) redirect(to);

  return (
    <div className={styles.redirectSection}>
      {!canceled && <Typography>Haz click en el boton para cancelar</Typography>}
      <Button
        variant={canceled ? "outlined" : "contained"}
        color={canceled ? "warning" : "error"}
        onClick={cancelRedirect}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export const RedirectLinkPageContentBody = ({ redirectLink }: { redirectLink: RedirectLink }) => {
  if (!redirectLink.canReturnToProfile) return null;

  return (
    <div className={styles.canReturnToProfileSection}>
      <Tooltip title={redirectLink.to} placement="top">
        <ExternalLink href={redirectLink.to} />
      </Tooltip>
      <RedirectSection to={redirectLink.to} />
      <hr
        style={{
          borderColor: hexToRgba(redirectLink.color || "#000000", 0.5),
        }}
      />
      <p>
        Visualiza todos sus links desde{" "}
        <Link href={`/profile/${redirectLink.owner?.name}`} style={{ color: redirectLink?.color }}>
          aqui
        </Link>
      </p>
    </div>
  );
};
