import React from "react";

import TableCell from "@mui/material/TableCell/TableCell";
import TableRow from "@mui/material/TableRow/TableRow";

import { TableHeaderData } from "../../LinkTable";

import { RowActions } from "./_rowActions";
import { CellContent } from "./_cellContent";

const LinkTableRow: ExtendedComponent<{
  headers: TableHeaderData[];
  row: RedirectLink;
}> = ({ headers, row }) => {
  return (
    <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      {headers.map((h, index) => (
        <TableCell key={h + index} component="th" scope={index === 0 ? "row" : ""}>
          <CellContent center={index !== 0} header={h} data={row} />
        </TableCell>
      ))}
      <RowActions redirectLink={row as RedirectLink} />
    </TableRow>
  );
};

export default LinkTableRow;
