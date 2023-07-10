"use client";

import { SessionProvider } from "next-auth/react";
import { BrowserContextProvider } from "../../contexts/BrowserContext";

const Providers: DefaultComponent = ({ children }) => {
  return (
    <SessionProvider>
      <BrowserContextProvider>{children}</BrowserContextProvider>
    </SessionProvider>
  );
};

export default Providers;
