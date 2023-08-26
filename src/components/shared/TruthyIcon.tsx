import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const TruthyIcon: ExtendedComponent<{ value: boolean }> = ({ value }) => {
  return Boolean(value) ? <CheckIcon /> : <ClearIcon />;
};

export default TruthyIcon;
