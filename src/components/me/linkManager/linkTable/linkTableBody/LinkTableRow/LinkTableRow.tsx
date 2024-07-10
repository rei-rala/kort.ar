import React from "react";

import TableCell from "@mui/material/TableCell/TableCell";
import TableRow from "@mui/material/TableRow/TableRow";

import { TruthyIcon, ExternalLink } from "@/components/shared";
import { TableHeaderData, TableRowData } from "../../LinkTable";
import Box from "@mui/material/Box/Box";
import { useModal } from "@/contexts/modalContext";
import { LinkForm } from "@/components/me/linkForm/LinkForm";
import { Button } from "@mui/material";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type RedirectLinkMappedToObject = { [key in keyof RedirectLink]?: string };

const getCellDataType = (header: keyof RedirectLink) => {
  const keyBasedType: RedirectLinkMappedToObject = {
    id: "string",
    owner: "object",
    alias: "string",
    from: "string",
    to: "externalUrl",
    color: "color",
    icon: "icon",
    canReturnToProfile: "boolean",
    active: "boolean",
    hitCount: "number",
  };

  return keyBasedType[header] ?? "";
};

const getCellContent = (header: keyof RedirectLink, data: any) => {
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
  headers: TableHeaderData[];
  row: TableRowData;
}> = ({ headers, row }) => {
  const actionRef = React.useRef<HTMLButtonElement>(null);
  const { openNewModal } = useModal();

  const handleEditSubmit = () => {
    actionRef.current?.click();
  };

  const handleEditLink = () => {
    openNewModal(
      "Editar link",
      <LinkForm link={row as RedirectLink} ref={actionRef} />,
      <Button variant="contained" color="info" onClick={handleEditSubmit}>
        Editar
      </Button>
    );
  };

  const handleDeleteLink = () => {
    openNewModal(
      "Eliminar link",
      <p>Desea eliminar el link {row.alias}?</p>,
      <Button variant="contained" color="error" onClick={handleEditSubmit}>
        Editar
      </Button>
    );
  };

  return (
    <TableRow key={row.alias} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      {headers.map((h, index) => (
        <TableCell key={h + index} component="th" scope={index === 0 ? "row" : ""}>
          <Box
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: index === 0 ? "justify" : "center",
            }}
          >
            {h === "alias" && <AlternateEmailIcon htmlColor={row.color ?? ""} color={"primary"} />}
            {getCellContent(h, row[h])}
          </Box>
        </TableCell>
      ))}
      <TableCell align="center">{getCellContent("active", row["active"])}</TableCell>
      <TableCell sx={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
        <EditNoteIcon color="secondary" onClick={handleEditLink} sx={{ cursor: "pointer" }} />
        <DeleteForeverIcon color="primary" onClick={handleDeleteLink} sx={{ cursor: "pointer" }} />
      </TableCell>
    </TableRow>
  );
};

export default LinkTableRow;
