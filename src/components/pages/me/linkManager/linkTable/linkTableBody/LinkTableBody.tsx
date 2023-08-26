import TableBody from "@mui/material/TableBody/TableBody";
import LinkTableRow from "./LinkTableRow/LinkTableRow";
import { Header, Row } from "../LinkTable";

const LinkTableBody: ExtendedComponent<{ headers: Header[]; rows: Row[] }> = ({
  headers,
  rows,
}) => {
  return (
    <TableBody>
      {rows.map((row) => (
        <LinkTableRow key={`link-row:${row.alias}`} headers={headers} row={row} />
      ))}
    </TableBody>
  );
};

export default LinkTableBody;
