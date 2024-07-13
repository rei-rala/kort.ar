import { ExternalLink, TruthyIcon } from "@/components/shared";
import { Box } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

type RedirectLinkMappedToObject = { [key in keyof RedirectLink]?: string };

const getCellDataType = (header: keyof RedirectLink) => {
  const keyBasedType: RedirectLinkMappedToObject = {
    id: "string",
    owner: "object",
    alias: "string",
    from: "string",
    to: "externalUrl",
    color: "color",
    icon: "icon",
    public: "boolean",
    canReturnToProfile: "boolean",
    active: "boolean",
    hitCount: "number",
  };

  return keyBasedType[header] ?? "";
};

type CellContentProps = {
  header: keyof RedirectLink;
  data: any;
  center?: boolean;
};

export const CellContent = ({ header, data, center }: CellContentProps) => {
  let dataType = getCellDataType(header);
  let content;

  switch (dataType) {
    case "boolean":
      content = <TruthyIcon value={data[header]} />;
      break;
    case "externalUrl":
      content = <ExternalLink href={data[header]} />;
      break;
    default:
      content = <>{String(data[header])}</>;
  }

  return (
    <Box
      component="span"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: center ? "center" : "justify",
      }}
    >
      {header === "alias" && <AlternateEmailIcon sx={{ color: data.color }} />}
      {content}
    </Box>
  );
};
