"use client";

import { SessionProvider } from "next-auth/react";
import { BrowserContextProvider } from "../contexts/BrowserContext";
import { UserContextProvider } from "@/contexts/UserContext";

const Providers: DefaultComponent = ({ children }) => {
  return (
    <SessionProvider>
      <UserContextProvider>
        <BrowserContextProvider>{children}</BrowserContextProvider>
      </UserContextProvider>
    </SessionProvider>
  );
};

export default Providers;
