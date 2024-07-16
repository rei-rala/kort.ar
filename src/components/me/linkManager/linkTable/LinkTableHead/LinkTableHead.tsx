import "./linkTableHead.css";

import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import type { TableHeaderData } from "../LinkTable";

let localeTest: Locales = "es";

type Locales = "es" | "en" | "default";
type AvailableLocales = { [locale in Locales]?: string };
export type RedirectLinkLocale = { [key in TableHeaderData]: AvailableLocales } & {
  [key in keyof RedirectLink]?: AvailableLocales;
} & { actions: AvailableLocales };

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
    default: "acceso a tu perfil",
  },
  public: {
    default: "público",
  },
  actions: {
    default: "acciones",
  },
  active: {
    default: "activo",
  },
  hitCount: {
    default: "visitas",
  },
  hits: {
    default: "lista visitas",
  },
  createdAt: {
    default: "fecha creación",
  },
  updatedAt: {
    default: "última actualización",
  },
  deletedAt: {
    default: "eliminado el",
  },
  flaggedAt: {
    default: "denunciado el",
  },
};

type LinkTableHeadCellProps = {
  center?: boolean;
  header: TableHeaderData | "actions";
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
        <LinkTableHeadCell header={"actions"} center={true} />
      </TableRow>
    </TableHead>
  );
};

export default LinkTableHead;
