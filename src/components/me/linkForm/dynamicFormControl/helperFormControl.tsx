import React, { forwardRef } from "react";
import {
  Checkbox,
  CheckboxProps,
  Input,
  InputProps,
  FormControlLabel,
  InputLabel,
} from "@mui/material";

import styles from "./dynamicFormControl.module.css";

const getInputType = (formField?: string) => {
  switch (formField) {
    case "active":
    case "canReturnToProfile":
    case "public":
      return "checkbox";
    case "color":
      return "color";
    default:
      return "text";
  }
};

type HelperFormControlProps = InputProps &
  CheckboxProps & {
    label?: string;
    formField?: string;
  };

export const HelperFormControl = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLInputElement,
  HelperFormControlProps
>(({ label, formField, ...props }, ref) => {
  const type = getInputType(formField);

  if (type === "checkbox") {
    return (
      <FormControlLabel
        control={
          <Checkbox
            {...(props as CheckboxProps)}
            checked={Boolean(props.value)}
            value={Boolean(props.value)}
            className={styles.input}
            inputRef={ref as React.RefObject<HTMLInputElement>}
            name={formField}
            id={`formField:${formField}`}
          />
        }
        className={styles.label}
        label={label}
      />
    );
  }

  return (
    <>
      <InputLabel className={styles.label} htmlFor={`formField:${formField}`}>
        {label}
      </InputLabel>
      <Input type={type} {...props} inputRef={ref} className={styles.input} {...props} />
    </>
  );
});

HelperFormControl.displayName = "HelperFormControl";
