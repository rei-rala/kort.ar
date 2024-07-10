import { Navbar } from "@/components/shared";

const ProfileLayoutComponents: DefaultComponent = ({ children }) => {
  return (
    <>
      <Navbar />
      <section>{children}</section>
    </>
  );
};

export default ProfileLayoutComponents;
