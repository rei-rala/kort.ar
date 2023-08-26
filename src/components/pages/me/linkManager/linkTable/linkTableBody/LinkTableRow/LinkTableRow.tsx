import TableCell from "@mui/material/TableCell/TableCell";
import TableRow from "@mui/material/TableRow/TableRow";

import { TruthyIcon, ExternalLink } from "@/components/shared";

type UserLinkMappedToObject = { [key in keyof UserLink]?: string };

const getCellDataType = (header: keyof UserLink) => {
  const keyBasedType: UserLinkMappedToObject = {
    id: "string",
    owner: "object",
    alias: "string",
    from: "string",
    to: "externalUrl",
    color: "color",
    icon: "icon",
    canReturnToProfile: "boolean",
  };

  return keyBasedType[header] ?? "";
};

const getCellContent = (header: keyof UserLink, data: any) => {
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
  headers: (keyof UserLink)[];
  row: UserLink;
}> = ({ headers, row }) => {
  return (
    <TableRow key={row.alias} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      {headers.map((h, index) => (
        <TableCell
          key={h + index}
          component="th"
          scope={index === 0 ? "row" : ""}
          align={index === 0 ? "justify" : "center"}
        >
          {getCellContent(h, row[h])}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default LinkTableRow;
