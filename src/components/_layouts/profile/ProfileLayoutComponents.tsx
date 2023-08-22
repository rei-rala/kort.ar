import Navbar from "@/components/DefaultNavbar";
import { Fragment } from "react";

const ProfileLayoutComponents: ExtendedComponent<{ brandFont: string }> = ({
  brandFont,
  children,
}) => {
  return (
    <Fragment>
      <Navbar brandFont={brandFont} />
      {children}
    </Fragment>
  );
};

export default ProfileLayoutComponents;
