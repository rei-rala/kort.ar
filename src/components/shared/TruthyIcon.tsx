import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const TruthyIcon: ExtendedComponent<{ value: boolean }> = ({ value }) => {
  const truthy = Boolean(value);
  const color = truthy ? "success" : "error";

  return truthy ? <CheckIcon color={color} /> : <ClearIcon color={color} />;
};

export default TruthyIcon;
