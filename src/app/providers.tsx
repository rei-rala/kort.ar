"use client";

import { SessionProvider } from "next-auth/react";
import { BrowserContextProvider } from "../contexts/BrowserContext";
import { ThemeProvider } from "@mui/material";

import themeOptions from "./theme";

const Providers: DefaultComponent = ({ children }) => {
  return (
    <SessionProvider>
      <BrowserContextProvider>
        <ThemeProvider theme={themeOptions}>{children}</ThemeProvider>
      </BrowserContextProvider>
    </SessionProvider>
  );
};

export default Providers;
