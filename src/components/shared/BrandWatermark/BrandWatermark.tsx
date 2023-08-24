import { Rubik } from "next/font/google";
import styles from "./brandWatermark.module.css";

const rubik = Rubik({ subsets: ["latin"] });

const BrandWatermark: ExtendedComponent<{
  customBrand?: string;
  position?: "";
}> = ({ customBrand, position = "TopLeft" }) => {
  const brand = customBrand ?? "unbranded :3";
  const className = `${rubik.className} ${styles.brandWatermarkText}`;

  return <h1 className={className}>{brand}</h1>;
};

export default BrandWatermark;
