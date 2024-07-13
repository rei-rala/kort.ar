import { Navbar } from "@/components/shared";
import { useBrowser } from "@/hooks/useBrowser";

export const LandingHeader = () => {
  const { scrollPercentage } = useBrowser();
  console.log({ ...scrollPercentage });
  return (
    <header>
      <Navbar hidden={scrollPercentage.y > 0.2} />
    </header>
  );
};
