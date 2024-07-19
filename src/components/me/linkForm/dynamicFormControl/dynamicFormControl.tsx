import React from "react";
import { FieldErrors, FieldValues, useWatch } from "react-hook-form";
import { FormControl, Typography } from "@mui/material";
import { HelperFormControl } from "./helperFormControl";
import { HelperText } from "./helperText";
import {
  redirectLinkLocales,
  type RedirectLinkLocale,
} from "../../linkManager/linkTable/LinkTableHead/LinkTableHead";

import styles from "./dynamicFormControl.module.css";

type DynamicFormControlProps = React.ComponentProps<typeof FormControl> & {
  formField: string;
  errors: FieldErrors<FieldValues>;
  control: any;
  register: any;
};

const getLabel = (formField: string) => {
  return (
    redirectLinkLocales[formField as keyof RedirectLinkLocale]?.default?.translatedName || formField
  );
};

const DynamicFormControl = ({
  formField,
  control,
  errors,
  register,
  disabled,
}: DynamicFormControlProps) => {
  const currentValue = useWatch({
    control,
    name: formField,
  });

  const label = getLabel(formField);
  const hasErrors = Boolean(errors[formField]);

  return (
    <FormControl key={`formGroup:${formField}`}>
      <HelperFormControl
        id={`formField:${formField}`}
        aria-invalid={errors[formField] ? "true" : "false"}
        label={label}
        formField={formField}
        value={currentValue}
        disabled={disabled}
        {...register(formField)}
      />

      {formField === "from" && <HelperText currentValue={currentValue} hasErrors={hasErrors} />}
      {hasErrors && (
        <Typography fontSize={12} className={styles.messageError}>
          {String(errors[formField]?.message)}
        </Typography>
      )}
    </FormControl>
  );
};

export { DynamicFormControl };
