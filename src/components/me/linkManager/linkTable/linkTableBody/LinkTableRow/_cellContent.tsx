import { ExternalLink, TruthyIcon } from "@/components/shared";
import { Box, Tooltip, Typography } from "@mui/material";
import { AlternateEmail, ContentCopy } from "@mui/icons-material";
import { hexToRgba, removeHTTPPrefix } from "@/utils/text";
import { NEXTAUTH_URL } from "@/constants";
import toast from "react-hot-toast";

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
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Link copiado al portapapeles!", {
      icon: "📋",
      style: {
        borderRadius: "10px",
        background: hexToRgba("#f9f9fa", 0.9),
      },
    });
  };

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
          <Tooltip title={data} placement="top">
            <ExternalLink href={data}>{data}</ExternalLink>
          </Tooltip>
        </>
      );
      break;
    case "string":
      if (header === "alias") {
        content = (
          <>
            <AlternateEmail sx={{ color }} />
            <Typography variant="body1">{data || "[Sin alias]"}</Typography>
          </>
        );
      } else if (header === "from") {
        const url = `${NEXTAUTH_URL}/${data}`;

        content = (
          <Tooltip
            sx={{
              cursor: "pointer",
            }}
            placement="top"
            title={`Copiar "${removeHTTPPrefix(url)}" al portapapeles`}
          >
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  color: "primary.main",
                  textDecoration: "underline",
                },
              }}
            >
              {data}
              <ContentCopy color="success" onClick={() => handleCopyToClipboard(url)} />
            </Typography>
          </Tooltip>
        );
      } else {
        content = <Typography variant="body1">{data}</Typography>;
      }
      break;
    case "object":
      content = <Typography variant="body1">{data?.name || "???"}</Typography>;
      break;
    default:
      content = <Typography variant="body1">{String(data)}</Typography>;
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
