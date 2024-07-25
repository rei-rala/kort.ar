import { NEXTAUTH_URL } from "@/constants";
import { z } from "zod";

export const pathRegex = /^(?![@\/\\])[a-zA-Z0-9\-_\?\!\*\.,]{5,}$/;
export const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
// URLs opcionales con http, https, o ftp protocolos, dominios válidos con subdominios, y rutas opcionales sin espacios ni barras consecutivas.
// quiza despues hacer que acepte urls sin https://
export const urlRegex =
  /^(?:(?:http|https|ftp):\/\/)?(?:[\w\-]+\.)+[a-zA-Z]{2,}(?:\/(?:[^/\s]*\/?)*)?$/;

export const invalidStartingCharacters = ["@", "/", "\\", " "];

export const redirectLinkSchema = z.object({
  text: z.string().max(100, "No puede exceder 100 caracteres"),
  alias: z.string(),
  from: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : val),
    z
      .string()
      .max(50, "No puede exceder 50 caracteres")
      .regex(/^(?!@)/, "No puede empezar con @")
      .refine((val) => val.trim() === "" || val.length >= 5, {
        message:
          "El campo debe tener al menos 5 caracteres o estar vacío para generación automática",
      })
      .refine(
        (val) => !invalidStartingCharacters.includes(val[0]),
        "No puede empezar con @, /, o \\"
      )
      .refine((val) => !val.startsWith(NEXTAUTH_URL), {
        message: "No puede redireccionar a la URL de la aplicación",
      })
      .refine((val) => !val || pathRegex.test(val), {
        message:
          "Sólo se permiten caracteres alfanuméricos y los siguientes signos: - _ ? ! * . , @",
      })
      .optional()
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
    (boolean) => String(boolean) === "true",
    z.boolean({ invalid_type_error: "Debe ser verdadero o falso" })
  ),
  public: z.preprocess(
    (boolean) => String(boolean) === "true",
    z.boolean({ invalid_type_error: "Debe ser verdadero o falso" })
  ),
  active: z.preprocess(
    (boolean) => String(boolean) === "true",
    z.boolean({ invalid_type_error: "Debe ser verdadero o falso" })
  ),
});

export const initialRedirectLinkValues: OptionalPropsOf<RedirectLink> = {
  alias: "",
  to: "",
  color: "#000000",
  icon: "",
  canReturnToProfile: false,
  public: false,
  active: true,
  hitCount: 0,
};
