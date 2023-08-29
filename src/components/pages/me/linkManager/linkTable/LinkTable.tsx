import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import LinkTableHead from "./LinkTableHead/LinkTableHead";
import LinkTableBody from "./linkTableBody/LinkTableBody";

type ommitedModelData = "owner" | "updatedAt" | "deletedAt";
export type TableHeaderData = keyof Omit<UserLink, ommitedModelData>;
export type TableRowData = Omit<UserLink, ommitedModelData>;

const LinkTable: ExtendedComponent<{ rows: UserLink[] }> = ({ rows }) => {
  let pickedHeaders: TableHeaderData[] = ["alias", "to"];
  let pickedRows: TableRowData[] = rows;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="Your table of links">
        <LinkTableHead headers={pickedHeaders} />
        <LinkTableBody headers={pickedHeaders} rows={pickedRows} />
      </Table>
    </TableContainer>
  );
};

export default LinkTable;
