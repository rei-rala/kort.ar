import { Rubik } from "next/font/google";
import Typography from "@mui/material/Typography/Typography";

import styles from "./brandWatermark.module.css";

const rubik = Rubik({ subsets: ["latin"] });

const BrandWatermark: ExtendedComponent<{
  customBrand?: string;
  position?: "";
}> = ({ customBrand }) => {
  const brand = customBrand ?? process.env.BRAND ?? "unbranded :3";
  const className = `${rubik.className} ${styles.brandWatermarkText}`;

  return (
    <Typography variant="h5" component="h1" className={className}>
      {brand}
    </Typography>
  );
};

export default BrandWatermark;
