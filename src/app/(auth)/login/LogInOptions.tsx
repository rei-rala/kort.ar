import { signIn } from "@/libs/auth";
import Button from "@mui/material/Button/Button";

export const LogInOptions = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button variant="contained" color="primary" size="large" type="submit">
        Iniciar sesion con google
      </Button>
      {/* ...other login options */}
    </form>
  );
};
