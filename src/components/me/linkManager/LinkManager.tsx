import LinkManagerHeader from "./LinkManagerHeader/LinkManagerHeader";
import LinkTable from "./linkTable/LinkTable";

const LinkManager: ExtendedComponent<{ links: RedirectLink[] }> = ({ links }) => {
  return (
    <LinkManagerHeader>
      <LinkTable rows={links} />
    </LinkManagerHeader>
  );
};

export default LinkManager;
