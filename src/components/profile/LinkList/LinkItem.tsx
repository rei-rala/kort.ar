import { NEXTAUTH_URL } from "@/constants";
import { Link } from "@mui/material";
import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography/Typography";

const LinkItem: ExtendedComponent<{ link: RedirectLink }> = ({ link }) => {
  return (
    <Link href={`${NEXTAUTH_URL}/${link.from}?skip=true`} target="_blank">
      <Paper elevation={2} sx={{ padding: "0.5rem", textAlign: "center" }}>
        <Typography variant="button">{link.alias || link.to}</Typography>
      </Paper>
    </Link>
  );
};

export default LinkItem;
