import { Navbar } from "@/components/shared";

const MeLayoutComponents: DefaultComponent = ({ children }) => {
  return (
    <>
      <Navbar />
      <section>{children}</section>
    </>
  );
};

export default MeLayoutComponents;
