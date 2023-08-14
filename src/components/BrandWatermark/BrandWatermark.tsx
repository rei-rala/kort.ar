import { Rubik } from "next/font/google";
import styles from "./brandWatermark.module.css";

const rubik = Rubik({ subsets: ["latin"] });

type Positions = "TopLeft" | "TopRight" | "BottomLeft" | "BottomRight";

const BrandWatermark: ExtendedComponent<{
  customBrand?: string;
  position?: Positions;
}> = ({ customBrand, position = "TopLeft" }) => {
  const brand = customBrand ?? "unbranded :3";
  return (
    <h1 className={`${rubik.className} ${styles.brandWatermarkText} ${styles[position]}`}>
      {brand}
    </h1>
  );
};

export default BrandWatermark;
