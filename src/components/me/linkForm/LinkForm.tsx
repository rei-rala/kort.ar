"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DynamicFormControl } from "./DynamicFormControl";
import { redirectLinkSchema } from "@/db/schemas";
import Button from "@mui/material/Button";

import styles from "./linkForm.module.css";

const LinkForm = () => {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(redirectLinkSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    // if (data) reset();
  };

  const renderFormControls = () => {
    const formFields = Object.keys(redirectLinkSchema.shape);

    return formFields.map((formField) => (
      <DynamicFormControl
        key={`form:${formField}`}
        formField={formField}
        control={control}
        errors={errors}
        register={register}
      />
    ));
  };

  return (
    <form className={styles.linkForm} onSubmit={handleSubmit(onSubmit)}>
      {renderFormControls()}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default LinkForm;
