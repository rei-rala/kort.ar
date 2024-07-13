import { Rubik } from "next/font/google";
import Typography from "@mui/material/Typography/Typography";

import styles from "./brandWatermark.module.css";
import { cn } from "@/utils/classnames";
import { BRAND } from "@/constants";

const rubik = Rubik({ subsets: ["latin"] });

const BrandWatermark = () => {
  return (
    <div className={styles.waterMarkContainer}>
      <Typography
        variant="h5"
        component="h1"
        className={cn(rubik.className, styles.brandWatermarkText)}
      >
        {BRAND}
      </Typography>
    </div>
  );
};

export default BrandWatermark;
