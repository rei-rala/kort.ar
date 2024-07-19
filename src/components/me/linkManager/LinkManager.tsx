import React from "react";
import { Box, Button, Typography } from "@mui/material";
import LinkTable from "./linkTable/LinkTable";
import { useModal } from "@/contexts/modalContext";
import { LinkForm } from "../linkForm/LinkForm";
import AddLinkIcon from "@mui/icons-material/AddLink";

const LinkManager: React.FC<{ links: RedirectLink[] }> = ({ links }) => {
  const { openNewModal, modalActionRef } = useModal();

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

  return (
    <>
      <Button
        color="success"
        variant="outlined"
        sx={{ m: "1rem", ml: 0 }}
        onClick={handleAddNewLink}
      >
        <AddLinkIcon sx={{ mr: "0.25rem" }} /> Nuevo link
      </Button>
      <Box>
        <LinkTable rows={links} />
      </Box>
    </>
  );
};

export default LinkManager;
