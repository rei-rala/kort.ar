"use client";

import { LinkManager } from "@/components/me";
import { getUserLinks } from "@/services/testLinks";
import { useEffect, useState } from "react";

export const MyLinksTab = () => {
  const [links, setLinks] = useState<RedirectLink[]>([]);

  useEffect(() => {
    getUserLinks().then(({ data: links }) => setLinks(links));
  }, []);

  return <LinkManager links={links} />;
};
