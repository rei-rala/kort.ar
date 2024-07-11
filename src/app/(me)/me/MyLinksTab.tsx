"use client";

import { LinkManager } from "@/components/me";
import { getOwnedRedirectLinks } from "@/services/testLinks";
import { useEffect, useState } from "react";

export const MyLinksTab = () => {
  const [links, setLinks] = useState<RedirectLink[]>([]);

  useEffect(() => {
    getOwnedRedirectLinks().then(({ data }) => setLinks(data ?? []));
  }, []);

  return <LinkManager links={links} />;
};
