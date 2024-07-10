import Box from "@mui/material/Box/Box";
import LinkItem from "./LinkItem";

const LinkList: ExtendedComponent<{ links: RedirectLink[] }> = ({ links }) => {
  return (
    <Box sx={{ display: "flex", flexFlow: "column nowrap", gap: "0.5rem" }}>
      {links.map((link) => (
        <LinkItem key={link.id} link={link} />
      ))}
    </Box>
  );
};

export default LinkList;
