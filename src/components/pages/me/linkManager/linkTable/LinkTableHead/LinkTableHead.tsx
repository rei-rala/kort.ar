import "./linkTableHead.css";

import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import type { Header } from "../LinkTable";

let localeTest: Locales = "es";

type Locales = "es" | "en" | "default";
type LocaleHeaders = {
  [key in
    | keyof Omit<UserLink, "createdAt" | "updatedAt" | "deletedAt" | "active">
    | Header
    | "edit"]: {
    [locale in Locales]?: string;
  };
};

const localeHeaders: LocaleHeaders = {
  id: {
    default: "id",
  },
  owner: {
    default: "dueño",
  },
  alias: {
    default: "alias",
  },
  from: {
    default: "desde",
  },
  to: {
    default: "redirige a",
  },
  color: {
    default: "color",
  },
  icon: {
    default: "ícono",
  },
  canReturnToProfile: {
    default: "puede ver tu perfil",
  },
  edit: {
    default: "modificar",
  },
};

type LinkTableHeadCellProps = {
  center?: boolean;
  header: Header | "edit";
};

const LinkTableHeadCell: ExtendedComponent<LinkTableHeadCellProps> = ({ header, center }) => {
  return (
    <TableCell align={center ? "center" : "justify"}>
      {(localeHeaders[header] && localeHeaders[header][localeTest]) ??
        localeHeaders[header]?.default ??
        String(header)}
    </TableCell>
  );
};

const LinkTableHead: ExtendedComponent<{ headers: Header[] }> = ({ headers }) => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((h, index) => (
          <LinkTableHeadCell header={h} center={index !== 0} key={"th" + String(h)} />
        ))}
        <LinkTableHeadCell header={"edit"} center={true} />
      </TableRow>
    </TableHead>
  );
};

export default LinkTableHead;
