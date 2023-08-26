import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import LinkTableHead from "./LinkTableHead/LinkTableHead";
import LinkTableBody from "./linkTableBody/LinkTableBody";

export type Header = "id" | "icon" | "alias" | "to";
export type Row = { [key in keyof UserLink as Header]: any };

const LinkTable: ExtendedComponent<{ rows: UserLink[] }> = ({ rows }) => {
  let headers: Header[] = ["id", "icon", "alias", "to"];
  let pickedFormatRows: Row[] = rows;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="Your table of links">
        <LinkTableHead headers={headers} />
        <LinkTableBody headers={headers} rows={pickedFormatRows} />
      </Table>
    </TableContainer>
  );
};

export default LinkTable;
