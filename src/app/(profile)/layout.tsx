import React from "react";
import { Rubik } from "next/font/google";

import Navbar from "@/components/layout/DefaultNavbar";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "kort.ar",
  description: "Crea, acorta y centraliza tus links en un solo lugar!",
};

const SiteLayout: DefaultComponent = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar brandFont={rubik.className} />
      {children}
    </React.Fragment>
  );
};

export default SiteLayout;
