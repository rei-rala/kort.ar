import { BrandWatermark } from "@/components/shared";

const LinkLayoutComponent: ExtendedComponent<{ customBrand: string }> = ({
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

export default LinkLayoutComponent;
