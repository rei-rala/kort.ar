import Button from "@mui/material/Button/Button";
import { signIn } from "next-auth/react";

const LogInOptions = () => {
  function handleLoginChrome() {
    signIn("google");
  }

  return (
    <>
      <Button variant="contained" color="primary" size="large" onClick={handleLoginChrome}>
        Iniciar sesion con google
      </Button>
    </>
  );
};

export default LogInOptions;
