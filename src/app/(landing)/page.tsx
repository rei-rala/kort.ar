import { LandingHeader } from "./landingComponents/landingHeader/LandingHeader";

import { LandingBody } from "./landingComponents/landingBody/LandingBody";

export default async function HomePage() {
  return (
    <>
      <LandingHeader />
      <LandingBody />
    </>
  );
}
