import { Navbar } from "@/components/shared";

const ProfileLayoutComponent: DefaultComponent = ({ children }) => {
  return (
    <>
      <Navbar />
      <section>{children}</section>
    </>
  );
};

export default ProfileLayoutComponent;
