"use client";

import GoBackLink from "@/components/shared/GoBackLink/GoBackLink";
import Fade from "@mui/material/Fade/Fade";

const GoBackLinkAnimated: DefaultComponent = ({}) => {
  return (
    <Fade in>
      <section>
        <nav>
          <GoBackLink title="dashboard" />
        </nav>
      </section>
    </Fade>
  );
};

export default GoBackLinkAnimated;
