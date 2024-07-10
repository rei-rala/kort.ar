import React from "react";
import { FieldErrors, FieldValues, useWatch } from "react-hook-form";
import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import { cn } from "@/utils/classnames";
import { pathRegex } from "@/db/schemas";

import styles from "./linkForm.module.css";

type HelperTextProps = {
  formField: string;
  currentValue: string;
  errors: FieldErrors<FieldValues>;
};

type DynamicFormControlProps = React.ComponentProps<typeof FormControl> & {
  formField: string;
  errors: FieldErrors<FieldValues>;
  control: any;
  register: any;
};

const getLabel = (formField: string) => {
  switch (formField) {
    case "alias":
      return "Alias";
    case "canReturnToProfile":
      return "¿Puede regresar a su perfil?";
    case "active":
      return "Link Activo";
    case "color":
      return "Color";
    case "from":
      return "Desde";
    case "icon":
      return "Icono";
    case "to":
      return "Hacia";
    default:
      return formField;
  }
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

const HelperText = ({ formField, currentValue, errors }: HelperTextProps) => {
  if (formField !== "from") return null;

  const hasError = errors[formField];

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
          hasError && styles.invalidValue
        )}
      >
        {currentValue || "... (asignación de url automática)"}
      </span>
    </FormHelperText>
  );
};

const DynamicFormControl = ({ formField, control, errors, register }: DynamicFormControlProps) => {
  const currentValue = useWatch({
    control,
    name: formField,
  });

  return (
    <FormControl key={`formGroup:${formField}`}>
      <InputLabel htmlFor={`formField:${formField}`}>{getLabel(formField)}</InputLabel>
      <Input
        id={`formField:${formField}`}
        aria-invalid="false"
        type={getInputType(formField)}
        {...register(formField)}
      />
      {errors[formField]?.message && <span>{String(errors[formField]?.message)}</span>}
      <HelperText formField={formField} currentValue={currentValue} errors={errors} />
    </FormControl>
  );
};

export { DynamicFormControl };
