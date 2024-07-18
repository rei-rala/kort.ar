import React from "react";
import { redirect } from "next/navigation";

import styles from "./layout.module.css";
import { auth } from "@/libs/auth";
import { BRAND } from "@/constants";
import { Box, Container } from "@mui/material";

export default async function AuthPageLayout({ children }: { readonly children: React.ReactNode }) {
  const session = await auth();

  if (session?.user) {
    redirect("/home");
  }

  return (
    <Container maxWidth="xs">
      <Box className={styles.layout}>
        <h1 className={styles.brand}>{BRAND}</h1>
        {children}
      </Box>
    </Container>
  );
}
