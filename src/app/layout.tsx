import "./globals.css";
import type { Metadata } from "next/types";

import Providers from "./providers";
import cfg from "@/config";

export const metadata: Metadata = {
  title: cfg.brand,
  description: `Inicia sesion ${cfg.brand}`,
};

const RootLayout: DefaultComponent = ({ children }) => {
  return (
    <html lang="es">
      <body>
        <Providers> {children} </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
