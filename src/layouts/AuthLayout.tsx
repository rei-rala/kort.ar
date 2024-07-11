"use client";

import { Container, Box } from "@mui/material";

const AuthLayoutComponent: DefaultComponent = ({ children }) => {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          padding: "1rem",
          color: "black",
          backgroundColor: "white",
          borderRadius: "2px",
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default AuthLayoutComponent;
