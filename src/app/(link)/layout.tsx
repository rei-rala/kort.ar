import cfg from "@/config";
import BrandWatermark from "@/components/BrandWatermark/BrandWatermark";

import styles from "./linkLayout.module.css";

export const metadata = {
  title: cfg.brand,
  description: "Crea, acorta y centraliza tus links en un solo lugar!",
};

export default function LinkLayout({ children }: { children: any }) {
  return (
    <>
      <BrandWatermark customBrand={cfg.brand} />
      <div className={styles.content}>{children}</div>
    </>
  );
}
