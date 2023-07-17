import React from "react";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export const AuthLayout: DefaultComponent = ({ children }) => {
  return (
    <React.Fragment>
      <h1 className={rubik.className}>Kort.ar</h1>
      {children}
    </React.Fragment>
  );
};

export default AuthLayout;
