import { Navbar } from "@/components/shared";

const MeLayoutComponents: ExtendedComponent<{ brandFont: string }> = ({
  children,
  brandFont,
  className,
}) => {
  return (
    <>
      <Navbar brandFont={brandFont} />
      <section className={className}>{children}</section>
    </>
  );
};

export default MeLayoutComponents;
