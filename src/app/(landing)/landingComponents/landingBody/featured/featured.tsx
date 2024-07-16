"use client";
import { Button, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomCard, CustomCardSkeleton } from "@/components/shared/CustomCard";
import { cn } from "@/utils/classnames";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LinkIcon from "@mui/icons-material/Link";
import styles from "../../landingHeader/landingHeaderMain/landingHeaderMain.module.css";

type FeaturedProps = {
  featured: Featured | null;
};

const FeaturedDescription = ({
  icon,
  tooltip,
  text,
}: {
  icon: React.ReactNode;
  tooltip: string;
  text: string;
}) => {
  return (
    <Tooltip title={tooltip}>
      <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {icon} {text}
      </Typography>
    </Tooltip>
  );
};

export const Featured = ({ featured }: FeaturedProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || featured === null) {
    return (
      <div className={cn(styles.content, styles.featuredContainer)}>
        <CustomCardSkeleton className={styles.featured} />
        <CustomCardSkeleton className={styles.featured} hasImage />
      </div>
    );
  }

  const { featuredLink, featuredUser } = featured;

  return (
    <div className={cn(styles.content, styles.featuredContainer)}>
      <CustomCard
        className={cn(styles.contentInner, styles.featured, styles.shadowed)}
        title={
          <>
            Enlace destacado:
            <span style={{ color: featuredLink.color }}>/</span>
            <b>{featuredLink.from}</b>
          </>
        }
        description={
          <FeaturedDescription
            icon={<LinkIcon />}
            tooltip="Redirige hacia"
            text={featuredLink.hitCount.toString()}
          />
        }
        actions={<Button href={`/${featuredLink.from}`}>Visitar</Button>}
      />
      <CustomCard
        className={cn(styles.contentInner, styles.featured, styles.shadowed)}
        title={"Usuario destacado: " + featuredUser.username}
        description={
          <FeaturedDescription
            icon={<RemoveRedEyeIcon />}
            tooltip="Vistas"
            text={featuredUser.hitCount.toString()}
          />
        }
        imageSrc={featuredUser.image}
        actions={<Button href={`/user/${featuredUser.username}`}>Visitar</Button>}
      />
    </div>
  );
};
