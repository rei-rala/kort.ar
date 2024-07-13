/* eslint-disable @next/next/no-img-element */

import { Typography } from "@mui/material";

export const RedirectLinkPageContentHeader = ({
  redirectLink: { owner },
}: {
  redirectLink: RedirectLink;
}) => {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <img
        style={{
          borderRadius: "20px",
          objectFit: "cover",
          lineHeight: "1.5rem",
          height: "50%",
        }}
        src={String(owner?.image)}
        alt={`Imagen de ${owner?.name}`}
      />
      <Typography variant="h5" component="h2">
        {owner?.name + " quiere llevarte a:"}
      </Typography>
    </header>
  );
};
