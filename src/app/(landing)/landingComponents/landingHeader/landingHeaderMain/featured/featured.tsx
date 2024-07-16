"use client";
import { Button, Link, Tooltip, Typography } from "@mui/material";
import styles from "../landingHeaderMain.module.css";
import { useEffect, useState } from "react";
import { CustomCard, CustomCardSkeleton } from "@/components/shared/CustomCard";
import { cn } from "@/utils/classnames";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LinkIcon from "@mui/icons-material/Link";

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
      <div
        className={cn(styles.content, styles.featuredContainer)}
        style={{
          minWidth: "200px",
        }}
      >
        <CustomCardSkeleton />
        <CustomCardSkeleton hasImage />
      </div>
    );
  }

  const { featuredLink, featuredUser } = featured;

  return (
    <div className={cn(styles.content, styles.featuredContainer)}>
      <CustomCard
        className={cn(styles.contentInner, styles.featured, styles.shadowed)}
        title={`Enlace destacado: ${featuredLink.from}`}
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
        actions={<Button href={`/${featuredUser.username}`}>Visitar</Button>}
      />
    </div>
  );
};
