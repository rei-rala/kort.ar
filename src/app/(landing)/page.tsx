import { LandingHeader } from "./landingComponents/landingHeader/LandingHeader";

import { LandingBody } from "./landingComponents/landingBody/LandingBody";
import { LandingFooter } from "./landingComponents/landingFooter/LandingFooter";

export default function HomePage() {
  return (
    <>
      <LandingHeader />
      <LandingBody />
      <LandingFooter />
    </>
  );
}
