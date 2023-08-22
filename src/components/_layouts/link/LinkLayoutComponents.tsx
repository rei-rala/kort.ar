import BrandWatermark from "@/components/BrandWatermark/BrandWatermark";

const LinkLayoutComponents: ExtendedComponent<{ customBrand: string }> = ({
  children,
  customBrand,
  className,
}) => {
  return (
    <>
      <BrandWatermark customBrand={customBrand} />
      <section className={className}>{children}</section>
    </>
  );
};

export default LinkLayoutComponents;
