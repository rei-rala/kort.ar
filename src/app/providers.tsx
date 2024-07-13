"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeRegistry } from "@/libs/mui";
import { ModalProvider } from "@/contexts/modalContext";
import { Toaster } from "react-hot-toast";
import { DialogProvider } from "@/contexts/alertDialogContext";

const Providers: DefaultComponent = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeRegistry>
        <ModalProvider>
          <DialogProvider>
            <Toaster reverseOrder={true} />
            {children}
          </DialogProvider>
        </ModalProvider>
      </ThemeRegistry>
    </SessionProvider>
  );
};

export default Providers;
