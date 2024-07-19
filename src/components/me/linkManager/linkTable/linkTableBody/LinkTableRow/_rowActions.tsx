import React from "react";
import { Button, TableCell, Tooltip, Typography } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { LinkForm } from "@/components/me/linkForm/LinkForm";
import { BRAND } from "@/constants";
import { useModal } from "@/contexts/modalContext";
import { useDialog } from "@/contexts/alertDialogContext";

export const RowActions = ({ redirectLink }: { redirectLink: RedirectLink }) => {
  const modalActionRef = React.useRef<HTMLButtonElement>(null);
  const { openNewModal } = useModal();
  const { openDialog } = useDialog();

  const handleSubmit = () => {
    modalActionRef.current?.click();
  };

  const usingDialog = (
    title: string,
    description: React.ReactNode,
    agreeText?: React.ReactNode,
    agreeTextColor?: "primary" | "secondary" | "success" | "info" | "warning" | "error"
  ) =>
    openDialog({
      title,
      description,
      agreeText,
      disagreeText: "Cancelar",
      onAgree: handleSubmit,
      agreeTextColor,
    });

  const handleEditConfirmDialog = () => {
    usingDialog(
      "Confirmar edición de link",
      <Typography>
        ¿Estás seguro que deseas editar este link?\nSi cambiaste el link de {BRAND}, perderas el
        conteo de visitas
      </Typography>,
      "Confirmar editar",
      "info"
    );
  };

  const handleEditLink = () => {
    openNewModal(
      <Typography key="editLinkTitle" variant="h5" component="h2">
        Editar link
      </Typography>,
      <LinkForm action="update" link={redirectLink} ref={modalActionRef} />,
      <Button variant="contained" color="info" onClick={handleEditConfirmDialog}>
        Editar
      </Button>
    );
  };

  const handleDeleteConfirmDialog = () => {
    usingDialog(
      "Confirmar eliminación link",
      <Typography>
        ¿Estás seguro que deseas eliminar este link? Esta acción no se puede deshacer
      </Typography>,
      "Confirmar eliminar",
      "error"
    );
  };

  const handleDeleteLink = () => {
    openNewModal(
      <Typography key="deleteLinkTitle" variant="h5" component="h2">
        Eliminar link
      </Typography>,

      <LinkForm action="delete" link={redirectLink} ref={modalActionRef} fieldsDisabled={true} />,
      <Button variant="contained" color="error" onClick={handleDeleteConfirmDialog}>
        Eliminar
      </Button>
    );
  };

  const actions = [
    {
      title: "Editar link",
      component: <EditNoteIcon color="secondary" onClick={handleEditLink} />,
    },
    {
      title: "Eliminar link",
      component: <DeleteForeverIcon color="error" onClick={handleDeleteLink} />,
    },
  ];

  return (
    <TableCell sx={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
      {actions.map(({ title, component }) => (
        <div key={`action-tooltip:${redirectLink.alias}:${title}`}>
          <Tooltip title={title} placement="top">
            {component}
          </Tooltip>
        </div>
      ))}
    </TableCell>
  );
};
