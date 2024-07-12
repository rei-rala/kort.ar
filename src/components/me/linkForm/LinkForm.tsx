"use client";

import React, { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DynamicFormControl } from "./dynamicFormControl/dynamicFormControl";
import { initialRedirectLinkValues, redirectLinkSchema } from "@/db/schemas";
import Button from "@mui/material/Button";

import styles from "./linkForm.module.css";
import { createRedirectLink, deleteRedirectLink, updateRedirectLink } from "@/services/testLinks";
import { useModal } from "@/contexts/modalContext";

type LinkFormProps = {
  link?: RedirectLink;
  fieldsDisabled?: boolean;
  action: "delete" | "update" | "create";
};

export const LinkForm = forwardRef(
  ({ link, fieldsDisabled, action }: LinkFormProps, ref: React.Ref<HTMLButtonElement>) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      control,
    } = useForm({
      resolver: zodResolver(redirectLinkSchema),
      defaultValues: link ?? initialRedirectLinkValues,
    });

    const { closeModal, modalActionRef } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
      console.log(modalActionRef?.current);
      const newRedirectLink = { ...data, id: link?.id };

      try {
        Promise.resolve()
          .then(() => setIsLoading(true))
          .then(() => {
            switch (action) {
              case "delete":
                return deleteRedirectLink(newRedirectLink);
              case "update":
                return updateRedirectLink(newRedirectLink);
              case "create":
                return createRedirectLink(newRedirectLink);
            }
          })
          .then((response) => {
            if (response) {
              reset();
              console.log(response);
              closeModal();
            }
          });
      } catch (error) {
        console.error(error); // Handle potential errors
      } finally {
        setIsLoading(false);
      }
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
          disabled={fieldsDisabled}
        />
      ));
    };

    return (
      <form className={styles.linkForm} onSubmit={handleSubmit(onSubmit)}>
        {renderFormControls()}
        <Button style={{ display: "none" }} ref={ref} type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    );
  }
);

LinkForm.displayName = "LinkForm";
