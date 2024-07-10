"use client";

import { Container, Box } from "@mui/material";

const AuthLayoutComponent: DefaultComponent = ({ children }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        position: "fixed",
        display: "grid",
        placeContent: "center",
        minHeight: "100vh",
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
        {children}
      </Box>
    </Container>
  );
};

export default AuthLayoutComponent;
