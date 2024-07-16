import { ExternalLink, TruthyIcon } from "@/components/shared";
import { Box, Tooltip, Typography } from "@mui/material";
import { Info, AlternateEmail } from "@mui/icons-material";
import { removeHTTPPrefix } from "@/utils/text";
import { NEXTAUTH_URL } from "@/constants";

type DataType =
  | "string"
  | "boolean"
  | "externalUrl"
  | "color"
  | "icon"
  | "number"
  | "date"
  | "object";

const dataTypes: Record<keyof RedirectLink, DataType> = {
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
  hits: "number",
  hitCount: "number",
  flaggedAt: "date",
  createdAt: "date",
  updatedAt: "date",
  deletedAt: "date",
};

type CellContentProps = {
  header: keyof RedirectLink;
  data: any;
  center?: boolean;
};

export const CellContent = ({ header, data: rowData, center }: CellContentProps) => {
  const dataType = dataTypes[header] || "string";

  // get only the current header and also the color
  const { [header]: data } = rowData;
  const color = String(rowData.color) || "#000000";

  let content;

  switch (dataType) {
    case "boolean":
      content = <TruthyIcon value={data} />;
      break;
    case "externalUrl":
      content = (
        <>
          <ExternalLink href={data}>{data}</ExternalLink>
          <Tooltip title={data}>
            <Info color="info" />
          </Tooltip>
        </>
      );
      break;
    case "string":
      if (header === "alias") {
        content = (
          <>
            <AlternateEmail sx={{ color }} />
            <Typography variant="body1">{data}</Typography>
          </>
        );
      } else if (header === "from") {
        content = (
          <>
            <Typography variant="body2">{data}</Typography>
            <Tooltip title={`${removeHTTPPrefix(NEXTAUTH_URL)}/${data}`}>
              <Info color="info" />
            </Tooltip>
          </>
        );
      } else {
        content = <Typography variant="body1">{data}</Typography>;
      }
      break;
    case "object":
      content = <Typography variant="body1">{data?.name || "???"}</Typography>;
      break;
    default:
      content = <Typography variant="body1">{data}</Typography>;
      break;
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
      {content}
    </Box>
  );
};
