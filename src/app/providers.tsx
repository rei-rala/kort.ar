"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeRegistry } from "@/libs/mui";
import { ModalProvider } from "@/contexts/ModalContext";

const Providers: DefaultComponent = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeRegistry>
        <ModalProvider> {children} </ModalProvider>
      </ThemeRegistry>
    </SessionProvider>
  );
};

export default Providers;
