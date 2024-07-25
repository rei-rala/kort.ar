import "./globals.css";
import type { Metadata } from "next/types";

import Providers from "./providers";
import { BRAND, NEXTAUTH_URL } from "@/constants";

export const metadata: Metadata = {
  metadataBase: new URL(NEXTAUTH_URL),
  title: `${BRAND} - crea y comparte enlaces cortos`,
  description: `${BRAND} es una aplicación que permite crear enlaces cortos y perfiles con enlaces personalizados para compartir tus contenidos de manera fácil y rápida.`,
  keywords: "enlaces cortos, acortador de enlaces, compartir enlaces, KORT.AR " + BRAND,
  authors: [{ name: "KORT.AR" }],
  icons: [
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon/kortar.png",
    },
  ],
  openGraph: {
    title: `${BRAND} - crea y comparte enlaces cortos`,
    description: `${BRAND} es una aplicación que permite crear enlaces cortos y perfiles con enlaces personalizados para compartir tus contenidos de manera fácil y rápida.`,
    images: "/@kortar.png",
    url: NEXTAUTH_URL,
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND} - crea y comparte enlaces cortos`,
    description: `${BRAND} es una aplicación que permite crear enlaces cortos y perfiles con enlaces personalizados para compartir tus contenidos de manera fácil y rápida.`,
    images: "/@kortar.png",
    site: "@_kortar",
    creator: "@_kortar",
  },
};

function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers> {children} </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
