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

type HelperFormControlProps = InputProps &
  CheckboxProps & {
    label?: string;
    formField?: string;
  };

export const HelperFormControl = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLInputElement,
  HelperFormControlProps
>(({ type, label, formField, ...props }, ref) => {
  if (type === "checkbox") {
    return (
      <FormControlLabel
        control={
          <Checkbox
            {...(props as CheckboxProps)}
            checked={Boolean(props.value)}
            inputRef={ref as React.RefObject<HTMLInputElement>}
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
      <Input type={type} {...props} inputRef={ref} {...props} />
    </>
  );
});

HelperFormControl.displayName = "HelperFormControl";
