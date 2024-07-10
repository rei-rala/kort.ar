import React, { forwardRef } from "react";
import {
  Checkbox,
  CheckboxProps,
  Input,
  InputProps,
  FormControlLabel,
  InputLabel,
} from "@mui/material";

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
        label={label}
      />
    );
  }

  return (
    <>
      <InputLabel htmlFor={`formField:${formField}`}>{label}</InputLabel>
      <Input {...props} inputRef={ref} {...props} />
    </>
  );
});

HelperFormControl.displayName = "HelperFormControl";
