import TableBody from "@mui/material/TableBody/TableBody";
import LinkTableRow from "./LinkTableRow/LinkTableRow";

const LinkTableBody: ExtendedComponent<{ headers: any; rows: UserLink[] }> = ({
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
