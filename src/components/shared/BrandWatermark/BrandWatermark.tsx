//import { Rubik } from "next/font/google";

import styles from "./brandWatermark.module.css";
import { cn } from "@/utils/classnames";
import { BRAND } from "@/constants";
import Link from "next/link";

const BrandWatermark = () => {
  return (
    <Link href="/" className={styles.waterMarkContainer}>
      <h1
        className={cn(
          //rubik.className,
          styles.brandWatermarkText
        )}
      >
        {BRAND}
      </h1>
    </Link>
  );
};

export default BrandWatermark;
