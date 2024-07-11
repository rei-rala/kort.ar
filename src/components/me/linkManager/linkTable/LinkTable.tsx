import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import LinkTableHead from "./LinkTableHead/LinkTableHead";
import LinkTableBody from "./linkTableBody/LinkTableBody";

type ommitedModelData = "owner" | "updatedAt" | "deletedAt";
export type TableRowData = Omit<RedirectLink, ommitedModelData>;
export type TableHeaderData = keyof TableRowData;

const LinkTable: ExtendedComponent<{ rows: RedirectLink[] }> = ({ rows }) => {
  let pickedHeaders: TableHeaderData[] = [
    "alias",
    "from",
    "to",
    "active",
    "public",
    "canReturnToProfile",
    "hitCount",
  ];
  let pickedRows: TableRowData[] = rows;

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="Tu tabla de links">
        <LinkTableHead headers={pickedHeaders} />
        <LinkTableBody headers={pickedHeaders} rows={pickedRows} />
      </Table>
    </TableContainer>
  );
};

export default LinkTable;
