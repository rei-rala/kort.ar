import { Navbar } from "@/components/shared";

const ProfileLayoutComponents: ExtendedComponent<{ brandFont: string }> = ({
  brandFont,
  children,
}) => {
  return (
    <>
      <Navbar brandFont={brandFont} />
      <section>{children}</section>
    </>
  );
};

export default ProfileLayoutComponents;
