"use client";

import { SessionProvider } from "next-auth/react";
import { BrowserContextProvider } from "../contexts/BrowserContext";
import ThemeRegistry from "@/components/_ThemeRegistry/ThemeRegistry";

const Providers: DefaultComponent = ({ children }) => {
  return (
    <SessionProvider>
      <BrowserContextProvider>
        <ThemeRegistry>{children}</ThemeRegistry>
      </BrowserContextProvider>
    </SessionProvider>
  );
};

export default Providers;
