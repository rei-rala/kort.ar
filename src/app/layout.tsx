import "./globals.css";
import type { Metadata } from "next/types";

import Providers from "./providers";

const title = process.env.BRAND;

export const metadata: Metadata = {
  title,
  description: `Inicia sesion ${title}`,
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
