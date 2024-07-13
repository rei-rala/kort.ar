"use client";

import React, { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DynamicFormControl } from "./dynamicFormControl/dynamicFormControl";
import { initialRedirectLinkValues, redirectLinkSchema } from "@/db/schemas";
import Button from "@mui/material/Button";

import styles from "./linkForm.module.css";
import {
  createRedirectLink,
  deleteRedirectLink,
  updateRedirectLink,
} from "@/services/redirectLink.services";
import { useModal } from "@/contexts/modalContext";
import toast from "react-hot-toast";

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

    const { closeModal } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
      const newRedirectLink = { ...data, id: link?.id };

      const actions = {
        delete: deleteRedirectLink,
        update: updateRedirectLink,
        create: createRedirectLink,
      };

      try {
        setIsLoading(true);
        toast.loading("En proceso...");

        await Promise.resolve(actions[action](newRedirectLink))
          .then((response) => {
            toast.dismiss();
            if (!response.success) {
              throw new Error(JSON.stringify(response, null, 2));
            }
            toast.success("Guardado correctamente");
            reset();
            closeModal();
          })
          .catch((err) => {
            //console.error(err);
            toast.error("Error al guardar");
          });
      } catch (error) {
        console.error(error);
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
