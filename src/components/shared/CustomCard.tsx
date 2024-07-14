import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";

type CustomCardProps = {
  imageSrc?: string | null;
  title: string;
  description: React.ReactNode | null;
  actions?: React.ReactNode | null;
  className?: string;
  style?: React.CSSProperties;
};

export const CustomCard = ({
  imageSrc,
  title,
  description,
  actions,
  ...props
}: CustomCardProps) => {
  return (
    <Card {...props}>
      <CardActionArea>
        {imageSrc && <CardMedia component="img" height="140" image={imageSrc} alt={title} />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};
