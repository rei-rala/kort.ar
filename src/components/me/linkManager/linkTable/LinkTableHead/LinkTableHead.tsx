import "./linkTableHead.css";

import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import type { TableHeaderData } from "../LinkTable";
import { Tooltip, Typography } from "@mui/material";

let localeTest: Locale = "es";

export type RedirectLinkLocale = { [key in TableHeaderData]: AvailableLocales } & {
  [key in keyof RedirectLink]?: AvailableLocales;
} & { actions: AvailableLocales };

export const redirectLinkLocales: RedirectLinkLocale = {
  id: {
    default: {
      translatedName: "id",
      description: "El identificador unico del link",
    },
  },
  owner: {
    default: {
      translatedName: "dueño",
      description: "El usuario dueño del link",
    },
  },
  alias: {
    default: {
      translatedName: "alias",
      description: "El alias del link, solo es visible para el dueño del link",
    },
  },
  from: {
    default: {
      translatedName: "desde",
      description: "El link desde el que se redirige",
    },
  },
  to: {
    default: {
      translatedName: "redirige a",
      description: "El link hacia donde redirige",
    },
  },
  color: {
    default: {
      translatedName: "color",
      description:
        "El color del link, solo visible para el dueño y en algun detalle estetico para el visitante",
    },
  },
  icon: {
    default: {
      translatedName: "ícono",
      description: "El ícono del link, solo visible para el dueño del link",
    },
  },
  canReturnToProfile: {
    default: {
      translatedName: "acceso a tu perfil",
      description:
        "Permite al visitante regresar a tu perfil, esta opcion le dara un tiempo de 5 segundos para regresar a tu perfil y omite la redireccion instantanea",
    },
  },
  public: {
    default: {
      translatedName: "público",
      description:
        "El link es público y puede ser accedido por cualquier persona, tambien puede ser encontrado en la busqueda de links y puede aparecer destacados",
    },
  },
  actions: {
    default: {
      translatedName: "acciones",
      description: "Acciones a realizar con el link",
    },
  },
  active: {
    default: {
      translatedName: "activo",
      description: "El link está activo",
    },
  },
  hitCount: {
    default: {
      translatedName: "visitas",
      description: "Número de visitas",
    },
  },
  hits: {
    default: {
      translatedName: "visitas",
      description: "Lista de visitas",
    },
  },
  createdAt: {
    default: {
      translatedName: "fecha creación",
      description: "Fecha de creación del link",
    },
  },
  updatedAt: {
    default: {
      translatedName: "última actualización",
      description: "Fecha de la última actualización del link",
    },
  },
  deletedAt: {
    default: {
      translatedName: "eliminado el",
      description: "Fecha de eliminación del link",
    },
  },
  flaggedAt: {
    default: {
      translatedName: "denunciado el",
      description: "Fecha de denuncia del link",
    },
  },
};

type LinkTableHeadCellProps = {
  center?: boolean;
  header: TableHeaderData | "actions";
};

const LinkTableHeadCell: ExtendedComponent<LinkTableHeadCellProps> = ({ header, center }) => {
  const text =
    redirectLinkLocales[header]?.[localeTest]?.translatedName ??
    redirectLinkLocales[header]?.default?.translatedName ??
    String(header);

  const tooltipText =
    redirectLinkLocales[header]?.[localeTest]?.description ??
    redirectLinkLocales[header]?.default?.description ??
    text;

  return (
    <TableCell align={center ? "center" : "justify"}>
      <Tooltip placement="top" title={tooltipText}>
        <Typography> {text} </Typography>
      </Tooltip>
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
