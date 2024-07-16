"use client";

import React, { useEffect, useState } from "react";
import { Button, Tooltip, Typography } from "@mui/material";
import { CustomCard } from "@/components/shared/CustomCard";
import { cn } from "@/utils/classnames";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LinkIcon from "@mui/icons-material/Link";
import styles from "../../landingHeader/landingHeaderMain/landingHeaderMain.module.css";
import { FeaturedSkeleton } from "./featuredSkeleton";
import { getFeaturedLinkAndProfile } from "@/services/featured.services";

type FeaturedProps = {
  featured: Featured | null;
};

const FeaturedDescription = ({
  description,
  icon,
  tooltip,
  text,
}: {
  description: React.ReactNode;
  icon: React.ReactNode;
  tooltip: string;
  text: string;
}) => {
  return (
    <div>
      {description}
      <Tooltip title={tooltip}>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {icon} {text}
        </Typography>
      </Tooltip>
    </div>
  );
};

export const Featured = () => {
  const [isClient, setIsClient] = useState(false);
  const [featured, setFeatured] = useState<Featured | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getFeaturedLinkAndProfile();
        setFeatured(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    setIsClient(true);
  }, []);

  if (!isClient || featured === null || featured === undefined) {
    return (
      <div className={cn(styles.content, styles.featuredContainer)}>
        <FeaturedSkeleton />
      </div>
    );
  }

  const { featuredLink, featuredUser } = featured;

  return (
    <div className={cn(styles.content, styles.featuredContainer)}>
      <CustomCard
        className={cn(styles.contentInner, styles.featured, styles.shadowed)}
        title={<Typography fontWeight={500}>Enlace destacado</Typography>}
        description={
          <FeaturedDescription
            description={
              <Typography color={"primary"}>
                <span style={{ color: featuredLink?.color || "#000" }}>/</span>
                {featuredLink.from}
              </Typography>
            }
            icon={<LinkIcon />}
            tooltip="Redirige hacia"
            text={featuredLink.hitCount.toString()}
          />
        }
        actions={<Button href={`/${featuredLink.from}`}> Visitar</Button>}
      />
      <CustomCard
        className={cn(styles.contentInner, styles.featured, styles.shadowed)}
        title={<Typography fontWeight={500}>Usuario destacado</Typography>}
        description={
          <FeaturedDescription
            description={<Typography color="primary">{featuredUser.username}</Typography>}
            icon={<RemoveRedEyeIcon />}
            tooltip="Vistas"
            text={featuredUser.hitCount.toString()}
          />
        }
        imageSrc={featuredUser.image}
        actions={<Button href={`/user/${featuredUser.username}`}> Visitar</Button>}
      />
    </div>
  );
};
