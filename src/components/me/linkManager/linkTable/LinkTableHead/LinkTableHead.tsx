import "./linkTableHead.css";

import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import type { TableHeaderData } from "../LinkTable";

let localeTest: Locales = "es";

type Locales = "es" | "en";
type AvailableLocales = { [locale in Locales]?: string } & { default: string };
export type RedirectLinkLocale = { [key in TableHeaderData]: AvailableLocales } & {
  [key in keyof RedirectLink]?: AvailableLocales;
} & { edit: AvailableLocales };

export const redirectLinkLocales: RedirectLinkLocale = {
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
  active: {
    default: "activo",
  },
  hitCount: {
    default: "visitas",
  },
  createdAt: {
    default: "fecha creación",
  },
};

type LinkTableHeadCellProps = {
  center?: boolean;
  header: TableHeaderData | "edit";
};

const LinkTableHeadCell: ExtendedComponent<LinkTableHeadCellProps> = ({ header, center }) => {
  return (
    <TableCell align={center ? "center" : "justify"}>
      {(redirectLinkLocales[header] && redirectLinkLocales[header][localeTest]) ??
        redirectLinkLocales[header]?.default ??
        String(header)}
    </TableCell>
  );
};

const LinkTableHead: ExtendedComponent<{ headers: TableHeaderData[] }> = ({ headers }) => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((h, index) => (
          <LinkTableHeadCell header={h} center={index !== 0} key={"th" + String(h)} />
        ))}
        <LinkTableHeadCell header={"active"} center={true} />
        <LinkTableHeadCell header={"edit"} center={true} />
      </TableRow>
    </TableHead>
  );
};

export default LinkTableHead;
