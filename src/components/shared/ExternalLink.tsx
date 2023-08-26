"use client";

import { SyntheticEvent } from "react";
import { removeHTTPPrefix, truncateString } from "@/utils/text";
import Link from "@mui/material/Link";

const ExternalLink: ExtendedComponent<{ value: any }> = ({ value }) => {
  function onClickHandler(e: SyntheticEvent<HTMLAnchorElement, MouseEvent>) {
    if (window.confirm(`Confirmar acceder a la url: ${String(value)}?`) === false) {
      e.preventDefault();
    }
  }

  return (
    <Link href={value} target="_blank" onClick={onClickHandler}>
      {truncateString(removeHTTPPrefix(String(value)))}
    </Link>
  );
};

export default ExternalLink;
