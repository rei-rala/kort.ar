/* eslint-disable @next/next/no-img-element */
import { Link, Typography } from "@mui/material";
import styles from "./errors.module.css";
import { BrandWatermark } from "@/components/shared";

const NotFound: DefaultComponent = () => {
  return (
    <main className={styles.main}>
      <BrandWatermark />
      <Typography variant="h5" component="h2" className={styles.heading}>
        Pagina no encontrada
      </Typography>
      <img src={`https://http.cat/404.jpg`} alt={"Cat sayin"} className={styles.image} />
      <div className={styles.control}>
        <Link href="/">Volver a pagina principal</Link>
      </div>
    </main>
  );
};

export default NotFound;
