import { FieldErrors, FieldValues, useWatch } from "react-hook-form";
import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import { cn } from "@/utils/classnames";
import styles from "./linkForm.module.css";
import { pathRegex } from "@/db/schemas";

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

export const DynamicFormControl: ExtendedComponent<{
  formField: string;
  errors: FieldErrors<FieldValues>;
  control: any;
  register: any;
}> = ({ formField, control, errors, register }) => {
  const currentValue = useWatch({
    control,
    name: formField,
  });

  const getHelperText = (formField: string, currentValue: string) => {
    if (formField === "from") {
      return (
        <FormHelperText>
          kort.ar/
          <span
            className={cn(
              styles.previewValue,
              errors[formField] && styles.invalidValue, // este solo se activa en el envio del formulario, por eso las validación posteriores se hacen on input
              currentValue?.length !== 0 ? styles.notEmpty : styles.empty,
              currentValue?.length > 0 && currentValue.length < 3 && styles.invalidValue,
              currentValue?.length > 50 && styles.invalidValue,
              !pathRegex.test(currentValue) && styles.invalidValue
            )}
          >
            {currentValue || "... (asignación de url automática)"}
          </span>
        </FormHelperText>
      );
    }
    return null;
  };

  return (
    <FormControl key={`formGroup:${formField}`}>
      <InputLabel htmlFor={`formField:${formField}`}>{formField}</InputLabel>
      <Input
        id={`formField:${formField}`}
        aria-invalid="false"
        type={getInputType(formField)}
        {...register(formField)}
      />
      {errors[formField]?.message && <span>{String(errors[formField]?.message)}</span>}
      {getHelperText(formField, currentValue)}
    </FormControl>
  );
};

export default DynamicFormControl;
