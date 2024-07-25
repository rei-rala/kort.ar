import { CustomCard, CustomCardSkeleton } from "@/components/shared/CustomCard";
import { Button, Tooltip, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LinkIcon from "@mui/icons-material/Link";
import { cn } from "@/utils/classnames";
import styles from "../../landingHeader/landingHeaderMain/landingHeaderMain.module.css";
import { redirectLinkLocales } from "@/components/me/linkManager/linkTable/LinkTableHead/LinkTableHead";

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

export const FeaturedUser = ({ featuredUser }: { featuredUser: FeaturedUser }) => {
  return featuredUser ? (
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
  ) : (
    <CustomCardSkeleton hasImage />
  );
};

export const FeaturedRedirectLink = ({ featuredLink }: { featuredLink: FeaturedLink }) => {
  return featuredLink ? (
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
          tooltip={redirectLinkLocales.to.default.description}
          text={featuredLink.hitCount.toString()}
        />
      }
      actions={<Button href={`/${featuredLink.from}`}> Visitar</Button>}
    />
  ) : (
    <CustomCardSkeleton />
  );
};
