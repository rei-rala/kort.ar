import "./linkTableHead.css";

import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import type { Headers } from "../LinkTable";

let localeTest: Locales = "es";

type Locales = "es" | "en" | "default";

const localeHeaders: {
  [key in keyof Headers]: { [locale in Locales]?: string };
} = {
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
};

type LinkTableHeadCellProps = {
  center?: boolean;
  header: keyof Headers;
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

const LinkTableHead: ExtendedComponent<{ headers: (keyof Headers)[] }> = ({ headers }) => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((h, index) => (
          <LinkTableHeadCell header={h} center={index !== 0} key={"th" + h} />
        ))}
      </TableRow>
    </TableHead>
  );
};

export default LinkTableHead;
