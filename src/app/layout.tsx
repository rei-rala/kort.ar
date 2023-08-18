import "./globals.css";
import type { Metadata } from "next/types";

import Providers from "./providers";

export const metadata: Metadata = {
  title: process.env.BRAND,
  description: `Inicia sesion ${process.env.BRAND}`,
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
