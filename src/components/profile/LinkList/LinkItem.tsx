import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography/Typography";

const LinkItem: ExtendedComponent<{ link: RedirectLink }> = ({ link }) => {
  return (
    <Paper elevation={2} sx={{ padding: "0.5rem", textAlign: "center" }}>
      <Typography variant="button">{link.alias}</Typography>
    </Paper>
  );
};

export default LinkItem;
