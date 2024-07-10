import React from "react";
import { FieldErrors, FieldValues, useWatch } from "react-hook-form";
import { FormControl } from "@mui/material";
import { HelperFormControl } from "./helperFormControl";
import { HelperText } from "./helperText";
import {
  redirectLinkLocales,
  type RedirectLinkLocale,
} from "../../linkManager/linkTable/LinkTableHead/LinkTableHead";

type DynamicFormControlProps = React.ComponentProps<typeof FormControl> & {
  formField: string;
  errors: FieldErrors<FieldValues>;
  control: any;
  register: any;
};

const getLabel = (formField: string) => {
  return redirectLinkLocales[formField as keyof RedirectLinkLocale]?.default || formField;
};

const getInputType = (formField: string) => {
  switch (formField) {
    case "active":
    case "canReturnToProfile":
      return "checkbox";
    case "color":
      return "color";
    default:
      return "text";
  }
};

const DynamicFormControl = ({ formField, control, errors, register }: DynamicFormControlProps) => {
  const currentValue = useWatch({
    control,
    name: formField,
  });

  const label = getLabel(formField);
  const inputType = getInputType(formField);
  const hasErrors = Boolean(errors[formField]);

  return (
    <FormControl key={`formGroup:${formField}`}>
      <HelperFormControl
        id={`formField:${formField}`}
        aria-invalid={errors[formField] ? "true" : "false"}
        type={inputType}
        label={label}
        formField={formField}
        value={currentValue}
        {...register(formField)}
      />

      {hasErrors && <span>{String(errors[formField]?.message)}</span>}
      {formField === "from" && <HelperText currentValue={currentValue} hasErrors={hasErrors} />}
    </FormControl>
  );
};

export { DynamicFormControl };
