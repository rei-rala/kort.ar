import React from "react";

import TableCell from "@mui/material/TableCell/TableCell";
import TableRow from "@mui/material/TableRow/TableRow";

import { TruthyIcon, ExternalLink } from "@/components/shared";
import { TableHeaderData, TableRowData } from "../../LinkTable";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ModifyLink from "../ModifyLink/ModifyLink";
import Box from "@mui/material/Box/Box";

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
    canReturnToProfile: "boolean",
    active: "boolean",
  };

  return keyBasedType[header] ?? "";
};

const getCellContent = (header: keyof RedirectLink, data: any) => {
  let dataType = getCellDataType(header);
  let content;

  switch (dataType) {
    case "boolean":
      content = <TruthyIcon value={data} />;
      break;
    case "externalUrl":
      content = <ExternalLink value={data} />;
      break;
    default:
      content = <>{String(data)}</>;
  }

  return content;
};

const LinkTableRow: ExtendedComponent<{
  headers: TableHeaderData[];
  row: TableRowData;
}> = ({ headers, row }) => {
  return (
    <TableRow key={row.alias} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      {headers.map((h, index) => (
        <TableCell key={h + index} component="th" scope={index === 0 ? "row" : ""}>
          <Box
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: index === 0 ? "justify" : "center",
            }}
          >
            {h === "alias" && <AlternateEmailIcon htmlColor={row.color ?? ""} color={"primary"} />}
            {getCellContent(h, row[h])}
          </Box>
        </TableCell>
      ))}
      <TableCell align="center">{getCellContent("active", row["active"])}</TableCell>
      <TableCell align="center">
        <ModifyLink href={`/me/link/${row.id}?returnUrl=/me`} />
      </TableCell>
    </TableRow>
  );
};

export default LinkTableRow;
