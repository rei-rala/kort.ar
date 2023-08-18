"use client";

import React from "react";
import { Rubik } from "next/font/google";
import { Box, Container } from "@mui/material";

import styles from "./layout.module.css";

const rubik = Rubik({ subsets: ["latin"] });

export default function AuthLayout({ children }: { children: any }) {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "grid",
        placeContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          textAlign: "center",
          gap: "1rem",
          margin: "auto",
          padding: "1rem",
          color: "black",
          backgroundColor: "white",
          height: "100%",
          borderRadius: "3px",
        }}
      >
        <h1 className={`${rubik.className} ${styles.brand}`}>{process.env.BRAND}</h1>
        {children}
      </Box>
    </Container>
  );
}
