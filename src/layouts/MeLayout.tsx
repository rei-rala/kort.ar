import { Navbar } from "@/components/shared";

const MeLayoutComponent: DefaultComponent = ({ children }) => {
  return (
    <>
      <Navbar />
      <section>{children}</section>
    </>
  );
};

export default MeLayoutComponent;
