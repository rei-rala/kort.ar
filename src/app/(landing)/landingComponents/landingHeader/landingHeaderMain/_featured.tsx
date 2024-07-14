"use client";
import { Link } from "@mui/material";
import styles from "./landingHeaderMain.module.css";
import { useEffect, useState } from "react";
import { CustomCard } from "@/components/shared/CustomCard";
import { cn } from "@/utils/classnames";

type FeaturedProps = {
  featured: Featured | null;
};

export const Featured = ({ featured }: FeaturedProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading placeholder
  }

  const { featuredLink, featuredUser } = featured || {};

  return (
    <div className={cn(styles.content, styles.featuredContainer)}>
      <CustomCard
        className={cn(styles.contentInner, styles.featured, styles.shadowed)}
        title={"Enlace destacado: "}
        description={String("Hitcount:" + featuredLink!.hitCount)}
        actions={<Link href={`/${featuredLink!.from}`}>Visitar</Link>}
      />
      <CustomCard
        className={cn(styles.contentInner, styles.featured, styles.shadowed)}
        title={"Usuario destacado: " + featuredUser!.username}
        description={String("Hitcount:" + featuredUser!.hitCount)}
        imageSrc={featuredUser!.image}
        actions={<Link href={`/user/${featuredUser!.username}`}>Visitar</Link>}
      />
    </div>
  );
};
