"use client";

import React from "react";
import { Button } from "@mui/material";
import LinkManagerHeader from "./LinkManagerHeader/LinkManagerHeader";
import LinkTable from "./linkTable/LinkTable";

import styles from "./linkManager.module.css";
import { useModal } from "@/contexts/modalContext";
import { LinkForm } from "../linkForm/LinkForm";

const LinkManager: React.FC<{ links: RedirectLink[] }> = ({ links }) => {
  const { openNewModal, actionRef } = useModal();

  const handleModalClick = () => {
    actionRef?.current?.click();
  };

  const handleAddNewLink = () => {
    openNewModal(
      "Nuevo link",
      <LinkForm ref={actionRef} />,
      <Button onClick={handleModalClick}>Guardar</Button>
    );
  };

  return (
    <>
      <Button
        color="success"
        variant="outlined"
        className={styles.addNewLinkButton}
        onClick={handleAddNewLink}
      >
        Nuevo link
      </Button>
      <LinkManagerHeader>
        <LinkTable rows={links} />
      </LinkManagerHeader>
    </>
  );
};

export default LinkManager;
