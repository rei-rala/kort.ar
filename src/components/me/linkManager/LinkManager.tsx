import React from "react";
import { Box, Button } from "@mui/material";
import LinkTable from "./linkTable/LinkTable";
import AddLinkIcon from "@mui/icons-material/AddLink";

const LinkManager: React.FC<{ links: RedirectLink[]; handleAddNewLink: () => void }> = ({
  links,
  handleAddNewLink,
}) => {
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
