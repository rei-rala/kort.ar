"use client";

import { Button } from "@mui/material";
import LinkManagerHeader from "./LinkManagerHeader/LinkManagerHeader";
import LinkTable from "./linkTable/LinkTable";

import styles from "./linkManager.module.css";

const LinkManager: ExtendedComponent<{ links: RedirectLink[] }> = ({ links }) => {
  return (
    <>
      <Button
        color="success"
        variant="outlined"
        className={styles.addNewLinkButton}
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
