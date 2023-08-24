import { BrandWatermark } from "@/components/shared";

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
