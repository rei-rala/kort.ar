"use client";

import { NEXTAUTH_URL } from "@/constants";
import { Button, Link } from "@mui/material";
import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography/Typography";

import OfflineShareIcon from "@mui/icons-material/OfflineShare";

const LinkItem: ExtendedComponent<{ link: RedirectLink }> = ({ link }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: "0.5rem",
        textAlign: "center",
      }}
    >
      <Link href={`${NEXTAUTH_URL}/${link.from}?skip=true`} target="_blank" sx={{ flex: 1 }}>
        <Typography variant="button">{link.alias || link.to}</Typography>
      </Link>
      <Button
        sx={{ position: "absolute", right: 0 }}
        onClick={(e) => {
          e.stopPropagation();
          console.log(e);
        }}
      >
        <OfflineShareIcon />
      </Button>
    </Paper>
  );
};

export default LinkItem;
