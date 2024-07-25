"use client";

import { LinkManager } from "@/components/me";
import { LinkForm } from "@/components/me/linkForm/LinkForm";
import { useModal } from "@/contexts/modalContext";
import { getOwnedRedirectLinks } from "@/services/redirectLink.services";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddLinkIcon from "@mui/icons-material/AddLink";
import toast from "react-hot-toast";

export const MyLinksTab = () => {
  const { openNewModal, modalActionRef } = useModal();
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<RedirectLink[]>();

  useEffect(() => {
    Promise.resolve(() => setLoading(true))
      .then(() =>
        toast.promise(
          getOwnedRedirectLinks().then(({ data }) => {
            setLinks(data ?? []);
          }),
          {
            loading: "Cargando links...",
            success: "Links cargados",
            error: "Error al cargar links",
          }
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const handleModalClick = () => {
    modalActionRef?.current?.click();
  };

  const handleAddNewLink = () => {
    openNewModal(
      [
        <Typography key="newLinkTitle" variant="h5" component="h2">
          Nuevo link
        </Typography>,
        <Typography key="newLinkSubtitle" variant="body2" component="p">
          Llena los campos para crear un nuevo link
        </Typography>,
      ],
      [<LinkForm key="newLinkAction" action="create" ref={modalActionRef} />],
      <Button
        variant="contained"
        color="success"
        disabled={modalActionRef?.current?.disabled}
        onClick={handleModalClick}
      >
        Guardar
      </Button>
    );
  };

  if (loading) return <Typography>Cargando...</Typography>;
  if (!links || !links.length)
    return (
      <Typography>
        No tienes links creados
        <Button color="success" variant="outlined" sx={{ m: "1rem" }} onClick={handleAddNewLink}>
          <AddLinkIcon />
          Crear nuevo link
        </Button>
      </Typography>
    );
  return <LinkManager links={links} handleAddNewLink={handleAddNewLink} />;
};
