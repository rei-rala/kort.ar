import * as React from "react";
import Card, { CardTypeMap } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Skeleton } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type Alignment = "inherit" | "left" | "center" | "right" | "justify";

type CustomCardProps = {
  imageSrc?: string | null;
  title: React.ReactNode | null;
  description: React.ReactNode | null;
  actions?: React.ReactNode | null;
  className?: string;
  style?: React.CSSProperties;
  align?: Alignment;
  alignment?: {
    title?: Alignment;
    description?: Alignment;
    action?: Alignment;
  };
};

type CardPartialProps = Partial<OverridableComponent<CardTypeMap<{}, "div">>> & {
  className: string;
};

export const CustomCard = ({
  imageSrc,
  title,
  description,
  actions,
  align = "left",
  alignment,
  ...props
}: CustomCardProps & CardPartialProps) => {
  return (
    <Card {...props}>
      <CardActionArea>
        {imageSrc && (
          <CardMedia component="img" height="140" image={imageSrc} alt={String(title) /* sorry*/} />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align={alignment?.title || align}>
            {title}
          </Typography>
          <Typography variant="body2" align={alignment?.description || align}>
            {description === null ? <Skeleton /> : description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};

export const CustomCardSkeleton = ({
  hasImage = false,
  backgroundColor = "grey",
  className,
  ...props
}: {
  hasImage?: boolean;
  backgroundColor?: string;
} & CardPartialProps) => {
  return (
    <Card {...props}>
      <CardActionArea>
        {hasImage && <Skeleton variant="rectangular" height={140} sx={{ backgroundColor }} />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Skeleton variant="text" sx={{ backgroundColor }} />
          </Typography>
          <Typography variant="body2">
            <Skeleton variant="text" sx={{ backgroundColor }} />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button>
          <Skeleton variant="text" sx={{ width: "100%", backgroundColor }} />
        </Button>
      </CardActions>
    </Card>
  );
};
