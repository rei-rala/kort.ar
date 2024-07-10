"use client";

import React from "react";
import { Button } from "@mui/material";
import LinkManagerHeader from "./LinkManagerHeader/LinkManagerHeader";
import LinkTable from "./linkTable/LinkTable";
import { useModal } from "@/contexts/modalContext";
import { LinkForm } from "../linkForm/LinkForm";
import AddLinkIcon from "@mui/icons-material/AddLink";

const LinkManager: React.FC<{ links: RedirectLink[] }> = ({ links }) => {
  const { openNewModal, actionRef } = useModal();

  const handleModalClick = () => {
    actionRef?.current?.click();
  };

  const handleAddNewLink = () => {
    openNewModal(
      "Nuevo link",
      <LinkForm ref={actionRef} />,
      <Button variant="contained" color="success" onClick={handleModalClick}>
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
      <LinkManagerHeader>
        <LinkTable rows={links} />
      </LinkManagerHeader>
    </>
  );
};

export default LinkManager;
