import * as React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import LinkTableHead from "./LinkTableHead/LinkTableHead";
import LinkTableBody from "./linkTableBody/LinkTableBody";

export type Headers = UserLink & { id?: string; owner?: Object };

function getNonObjectKeys(obj: UserLink[]): (keyof Headers)[] {
  const firstOrDefault: UserLink = obj.at(0) || ({} as UserLink);
  const nonObjectKeys: (keyof Headers)[] = [];

  for (let objectKey in firstOrDefault) {
    let keyTyped = objectKey as keyof UserLink;
    if (typeof firstOrDefault[keyTyped] === "object") {
      continue;
    }
    nonObjectKeys.push(keyTyped as keyof Headers);
  }

  return nonObjectKeys;
}

const LinkTable: ExtendedComponent<{ rows: UserLink[] }> = ({ rows }) => {
  let headers = getNonObjectKeys(rows) as (keyof Headers)[];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="Your table of links">
        <LinkTableHead headers={headers} />
        <LinkTableBody headers={headers} rows={rows} />
      </Table>
    </TableContainer>
  );
};

export default LinkTable;
