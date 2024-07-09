import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Link from "@mui/material/Link/Link";

const ModifyLink = ({ href }: { href: string | undefined }) => {
  return (
    <Link href={href}>
      <AutoFixHighIcon />
    </Link>
  );
};

export default ModifyLink;
