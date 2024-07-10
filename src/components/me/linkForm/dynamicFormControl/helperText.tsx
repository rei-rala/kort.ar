import { pathRegex } from "@/db/schemas";
import { FormHelperText } from "@mui/material";

import { cn } from "@/utils/classnames";
import styles from "./dynamicFormControl.module.css";

type HelperTextProps = {
  currentValue: string;
  hasErrors: boolean;
};
export const HelperText = ({ currentValue, hasErrors }: HelperTextProps) => {
  return (
    <FormHelperText>
      kort.ar/
      <span
        className={cn(
          styles.previewValue,
          currentValue ? styles.notEmpty : styles.empty,
          currentValue?.length > 0 && currentValue.length < 3 && styles.invalidValue,
          currentValue?.length > 50 && styles.invalidValue,
          !pathRegex.test(currentValue) && styles.invalidValue,
          hasErrors && styles.invalidValue
        )}
      >
        {currentValue || "... (asignación de url automática)"}
      </span>
    </FormHelperText>
  );
};
