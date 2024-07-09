"use client";

import GoBackLink from "@/components/shared/GoBackLink/GoBackLink";
import Fade from "@mui/material/Fade/Fade";

const GoBackLinkAnimated: ExtendedComponent<{ title: string }> = ({ title }) => {
  return (
    <Fade in>
      <GoBackLink title={title} />
    </Fade>
  );
};

export default GoBackLinkAnimated;
