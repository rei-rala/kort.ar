import React, { ReactNode } from "react";
import { Button, TableCell, Typography } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { LinkForm } from "@/components/me/linkForm/LinkForm";
import { BRAND, NEXTAUTH_URL } from "@/constants";
import { useModal } from "@/contexts/modalContext";
import toast from "react-hot-toast";
import { hexToRgba } from "@/utils/text";
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

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`${NEXTAUTH_URL}/${redirectLink.from || ""}`);
    toast("Link copiado al portapapeles!", {
      icon: "📋",
      style: {
        borderRadius: "10px",
        background: hexToRgba("#f9f9fa", 0.9),
      },
    });
  };

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

  return (
    <TableCell sx={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
      <ContentCopyIcon color="success" onClick={handleCopyToClipboard} sx={{ cursor: "pointer" }} />
      <EditNoteIcon color="secondary" onClick={handleEditLink} sx={{ cursor: "pointer" }} />
      <DeleteForeverIcon color="error" onClick={handleDeleteLink} sx={{ cursor: "pointer" }} />
    </TableCell>
  );
};
