import "./globals.css";
import type { Metadata } from "next/types";
import { Open_Sans } from "next/font/google";

import Providers from "./providers";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "kort.ar",
  description: "Inicia sesion kort.ar",
};

const RootLayout: DefaultComponent = ({ children }) => {
  return (
    <html lang="es">
      <body className={openSans.className}>
        <Providers> {children} </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
