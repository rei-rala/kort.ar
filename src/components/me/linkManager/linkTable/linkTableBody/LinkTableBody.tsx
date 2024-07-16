import TableBody from "@mui/material/TableBody/TableBody";
import LinkTableRow from "./LinkTableRow/LinkTableRow";
import type { TableHeaderData } from "../LinkTable";

const LinkTableBody: ExtendedComponent<{ headers: TableHeaderData[]; rows: RedirectLink[] }> = ({
  headers,
  rows,
}) => {
  return (
    <TableBody>
      {rows.map((row) => (
        <LinkTableRow key={`link-row:${row.from}`} headers={headers} row={row} />
      ))}
    </TableBody>
  );
};

export default LinkTableBody;
