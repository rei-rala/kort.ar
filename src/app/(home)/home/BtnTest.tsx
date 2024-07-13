"use client";

import { createRedirectLink } from "@/services/redirectLink.services";
import { Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";

export const BtnTest = () => {
  let [testRedirectLink, setTestRedirectLink] = useState<RedirectLink>();

  useEffect(() => {
    fetch("http://localhost:3000/db/redirectLinks.json")
      .then((res) => res.json())
      .then((links) => {
        setTestRedirectLink(links[0]);
      });
  }, []);

  if (testRedirectLink)
    return (
      <Button
        onClick={() => {
          testRedirectLink && createRedirectLink(testRedirectLink).then(console.log);
        }}
      >
        <Typography variant="body1">Test</Typography>
      </Button>
    );
};
