import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const TruthyIcon: ExtendedComponent<{ value: boolean }> = ({ value }) => {
  const truthy = Boolean(value);
  const color = truthy ? "success" : "error";

  const Icon = truthy ? CheckIcon : ClearIcon;

  return <Icon color={color} />;
};

export default TruthyIcon;
