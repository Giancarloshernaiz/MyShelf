import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/*"];

export const authorSchema = z.object({
  name: z.string().min(3, { message: "Ingrese un nombre válido" }),
  lastName: z.string().min(5, { message: "Ingrese un apellido válido" }),
  birthDate: z.string().refine((date) => new Date(date).toString() !== "Invalid Date", {message: "Ingrese una fecha válida"}),
  deathDate: z.string(),
});

export const BookRegisterSchema = z
  .object({
    
    cover:z
    .any()
    .refine((file) => file?.size <=  50000000, `El tamaño máximo de la imágen es de 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Solo los formatos .jpg, .jpeg, .png and .webp son aceptados."
    ),

    title: z
      .string()
      .min(1, { message: "El campo no puede estar vacío" })
      .max(50, { message: "Máximo 50 carácteres" }),

    authors: z
    .array(authorSchema)
    .min(1, { message: "Ingrese al menos un autor" }),

    genre: z
      .string()
      .min(1, { message: "El campo no puede estar vacío" })
      .max(50, { message: "Máximo de 50 carácteres" }),

    publishDate:z
      .string()
      .refine((date) => new Date(date).toString() !== "Invalid Date", {message: "Ingrese una fecha válida"}),

    publisher: z
      .string()
      .min(1, { message: "El campo no puede estar vacío" })
      .max(50, { message: "Máximo de 50 carácteres" }),

    rating: z
      .string()
      .refine((num) => !isNaN(parseFloat(num)), {message: "La valoración debe ser un valor numérico"})
      .refine((num) => parseFloat(num) >= 0 &&  parseFloat(num) <= 10, {message: "La valoración debe ser del 0 al 10"}),
        
  });
