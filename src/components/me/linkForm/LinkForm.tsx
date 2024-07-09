"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import type { FieldErrors, FieldValues } from "react-hook-form";

import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Input from "@mui/material/Input/Input";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import Button from "@mui/material/Button/Button";

const urlRegex = /^(?:(?:http|https|ftp):\/\/)?(?:[\w\-]+\.)+[a-zA-Z]{2,}(?:\/[/\w\-#?%.]*)?$/;
const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const schema = z.object({
  alias: z.string(),
  from: z
    .string()
    .max(50, "No puede exceder 50 caracteres")
    .min(3, "El origen para redireccionar debe ser de al menos 3 caracteres"),
  to: z.string().regex(urlRegex, "Ingrese una URL valida"), // URL
  color: z.string().regex(hexColorRegex, "Color invalido"),
  icon: z.string(),
  canReturnToProfile: z.boolean(),
  active: z.boolean(),
});

const DynamicFormControl: ExtendedComponent<{
  formField: string;
  errors: FieldErrors<FieldValues>;
  [key: string]: any;
}> = ({ formField, ...rest }) => {
  const { errors, register } = rest;
  return (
    <FormControl key={`formGroup:${formField}`}>
      <InputLabel htmlFor={`formField:${formField}`}>{formField}</InputLabel>
      <Input
        id={`formField:${formField}`}
        aria-invalid="false"
        type={
          ["active", "canReturnToProfile"].includes(formField)
            ? "checkbox"
            : formField === "color"
            ? "color"
            : "text"
        }
        {...register(formField)}
      />
      {errors[formField]?.message && <span>{String(errors[formField]?.message)}</span>}
      {formField === "from" && <FormHelperText>kort.ar/[...]</FormHelperText>}
    </FormControl>
  );
};

const LinkForm: DefaultComponent = () => {
  const {
    getValues,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const processForm = async (data: any) => {
    console.log(data);

    if (false) reset();
  };

  const formFields = Object.keys(schema._def.shape());

  return (
    <form
      onSubmit={handleSubmit(processForm)}
      style={{ display: "flex", flexDirection: "column", width: 300 }}
    >
      {formFields.map((formField, i) => (
        <DynamicFormControl
          formField={formField}
          errors={errors}
          register={register}
          key={formField}
        />
      ))}

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default LinkForm;
