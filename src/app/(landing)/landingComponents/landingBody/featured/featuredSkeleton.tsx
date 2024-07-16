import React from "react";
import { CustomCardSkeleton } from "@/components/shared/CustomCard";
import { cn } from "@/utils/classnames";

import styles from "../../landingHeader/landingHeaderMain/landingHeaderMain.module.css";

export const FeaturedSkeleton = () => {
  return (
    <div className={cn(styles.content, styles.featuredContainer)}>
      {[false, true].map((hasImage) => (
        <CustomCardSkeleton
          key={hasImage ? "ft:image" : "ft:no-image"}
          className={cn(styles.contentInner, styles.featured, styles.shadowed)}
          hasImage={hasImage}
        />
      ))}
    </div>
  );
};
