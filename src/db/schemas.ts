import { z } from "zod";

const pathRegex = /^[a-zA-Z0-9\-_\?\!\*\.,]*$/;
const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
// quiza despues hacer que acepte urls sin https://
const urlRegex = /^(?:(?:http|https|ftp):\/\/)?(?:[\w\-]+\.)+[a-zA-Z]{2,}(?:\/(?:[^/\s]*\/?)*)?$/;

const initialRedirectLinkValues: OptionalPropsOf<RedirectLink> = {
  alias: "",
  from: "",
  to: "",
  color: "#000000",
  icon: "",
  canReturnToProfile: false,
  active: true,
  hitCount: 0,
};

const redirectLinkSchema = z.object({
  alias: z.string(),
  from: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : val),
    z
      .string()
      .regex(
        pathRegex,
        "Solo se permiten caracteres alfanuméricos y los siguientes signos: - _ ? ! * . ,"
      )
      .max(50, "No puede exceder 50 caracteres")
      .refine((val) => val === "" || val.length >= 3, {
        message:
          "El campo debe tener al menos 3 caracteres o estar vacío para generación automática",
      })
  ),
  to: z
    .string()
    .max(1000, "No puede exceder 1000 caracteres")
    .regex(urlRegex, "Ingrese una URL valida")
    .refine((val) => val.startsWith("https://"), {
      message: "Solo se permiten URLs seguras (https://)",
    }),
  color: z.string().regex(hexColorRegex, "Color invalido"),
  icon: z.string(),
  canReturnToProfile: z.preprocess(
    (boolean) => boolean == "true",
    z.boolean({ invalid_type_error: "Debe ser verdadero o falso" })
  ),
  active: z.preprocess(
    (boolean) => boolean == "true",
    z.boolean({ invalid_type_error: "Debe ser verdadero o falso" })
  ),
});

export { pathRegex, urlRegex, hexColorRegex, initialRedirectLinkValues, redirectLinkSchema };
