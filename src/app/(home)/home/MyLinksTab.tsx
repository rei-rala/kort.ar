"use client";

import { LinkManager } from "@/components/me";
import { getOwnedRedirectLinks } from "@/services/redirectLink.services";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const MyLinksTab = () => {
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

  if (loading) return <Typography>Cargando...</Typography>;
  if (!links || !links.length) return <Typography>No tienes links creados</Typography>;
  return <LinkManager links={links} />;
};
