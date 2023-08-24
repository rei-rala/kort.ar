"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeRegistry } from "@/libs/mui";

const Providers: DefaultComponent = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeRegistry>{children}</ThemeRegistry>
    </SessionProvider>
  );
};

export default Providers;
