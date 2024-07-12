import TableBody from "@mui/material/TableBody/TableBody";
import LinkTableRow from "./LinkTableRow/LinkTableRow";
import { TableHeaderData, TableRowData } from "../LinkTable";

const LinkTableBody: ExtendedComponent<{ headers: TableHeaderData[]; rows: TableRowData[] }> = ({
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
