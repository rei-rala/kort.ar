import "./globals.css";
import { Open_Sans, Rubik } from "next/font/google";

import { Navbar } from "../components/Navbar";
import Providers from "./providers";

const openSans = Open_Sans({ subsets: ["latin"] });
const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "kort.ar",
  description: "Crea, acorta y centraliza tus links en un solo lugar!",
  content: "",
};

export const RootLayout: DefaultComponent = ({ children }) => {
  return (
    <html lang="es">
      <body className={openSans.className}>
        <Providers>
          <Navbar brandFont={rubik.className} />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
