import BrandWatermark from "@/components/BrandWatermark/BrandWatermark";

import styles from "./linkLayout.module.css";

const title = process.env.BRAND;

export const metadata = {
  title,
  description: "Crea, acorta y centraliza tus links en un solo lugar!",
};

export default function LinkLayout({ children }: { children: any }) {
  return (
    <>
      <BrandWatermark customBrand={title} />
      <div className={styles.content}>
        <span>{children}</span>
      </div>
    </>
  );
}
