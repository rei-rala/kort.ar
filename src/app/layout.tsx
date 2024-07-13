import "./globals.css";
import type { Metadata } from "next/types";

import Providers from "./providers";
import { BRAND } from "@/constants";

export const metadata: Metadata = {
  title: BRAND,
  description: `Inicia sesión en ${BRAND}`,
  icons: [
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon/kortar.png",
    },
  ],
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
