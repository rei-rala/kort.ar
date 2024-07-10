"use client";

import Link from "@mui/material/Link/Link";
import { useSearchParams } from "next/navigation";

const ReturnUrlLink: ExtendedComponent<{ title?: string; url?: string }> = ({ title, url }) => {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");
  const href = Boolean(returnUrl) ? String(returnUrl) : "/";

  return <Link href={url ?? href}>Volver {title && ` a ${title}`}</Link>;
};

export default ReturnUrlLink;
