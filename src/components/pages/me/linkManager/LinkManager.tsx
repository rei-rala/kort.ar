import LinkManagerHeader from "./LinkManagerHeader/LinkManagerHeader";
import LinkTable from "./linkTable/LinkTable";

const LinkManager: ExtendedComponent<{ links: UserLink[] }> = ({ links }) => {
  return (
    <LinkManagerHeader>
      <LinkTable rows={links} />
    </LinkManagerHeader>
  );
};

export default LinkManager;
