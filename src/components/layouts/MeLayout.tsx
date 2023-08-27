import { Navbar } from "@/components/shared";

const MeLayoutComponents: ExtendedComponent<{ brandFont: string }> = ({ children, brandFont }) => {
  return (
    <>
      <Navbar brandFont={brandFont} />
      <section>{children}</section>
    </>
  );
};

export default MeLayoutComponents;
