"use client";

import { Button } from "@mui/material";
import LinkManagerHeader from "./LinkManagerHeader/LinkManagerHeader";
import LinkTable from "./linkTable/LinkTable";

import styles from "./linkManager.module.css";
import { useModal } from "@/contexts/modalContext";
import { LinkForm } from "../linkForm/LinkForm";

const LinkManager: ExtendedComponent<{ links: RedirectLink[] }> = ({ links }) => {
  const { openNewModal } = useModal();

  const handleAddNewLink = () => {
    openNewModal("Nuevo link", <LinkForm />);
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
