"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/utils/classnames";

import styles from "../../landingHeader/landingHeaderMain/landingHeaderMain.module.css";
import { FeaturedSkeleton } from "./featuredSkeleton";
import { getFeaturedLinkAndProfile } from "@/services/featured.services";
import { FeaturedRedirectLink, FeaturedUser } from "./_featured";

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
      <FeaturedRedirectLink featuredLink={featuredLink} />
      <FeaturedUser featuredUser={featuredUser} />
    </div>
  );
};
