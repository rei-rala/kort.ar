"use client";

import { Ref, SyntheticEvent, forwardRef } from "react";
import { removeHTTPPrefix, truncateString } from "@/utils/text";
import Link, { LinkProps } from "@mui/material/Link";

const ExternalLink = forwardRef((props: LinkProps, ref: Ref<HTMLAnchorElement>) => {
  const { href, ...otherProps } = props;

  const onClickHandler = (e: SyntheticEvent<HTMLAnchorElement, MouseEvent>) => {
    if (window.confirm(`Confirmar acceder a la url: ${String(href)}?`) === false) {
      e.preventDefault();
    }
  };

  return (
    <Link href={href ?? "#"} {...otherProps} target="_blank" onClick={onClickHandler} ref={ref}>
      {truncateString(removeHTTPPrefix(String(href)))}
    </Link>
  );
});

ExternalLink.displayName = "ExternalLink";

export default ExternalLink;
