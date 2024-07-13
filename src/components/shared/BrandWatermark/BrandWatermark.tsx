import { Rubik } from "next/font/google";
import Typography from "@mui/material/Typography/Typography";

import styles from "./brandWatermark.module.css";
import { cn } from "@/utils/classnames";

const rubik = Rubik({ subsets: ["latin"] });

const BrandWatermark: ExtendedComponent<{
  customBrand?: string;
  position?: "";
}> = ({ customBrand }) => {
  const brand = customBrand ?? process.env.BRAND ?? "unbranded :3";
  return (
    <div className={styles.waterMarkContainer}>
      <Typography
        variant="h5"
        component="h1"
        className={cn(rubik.className, styles.brandWatermarkText)}
      >
        {brand}
      </Typography>
    </div>
  );
};

export default BrandWatermark;
