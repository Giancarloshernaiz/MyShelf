import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const author = ["name", "lastname", "birthdate", "deathdate"] as const;
export type Authors = (typeof author)[number];
export const mappedAuthors: {[key in Authors]: string} = {
    name: "Nombre",
    lastname: "Apellido",
    birthdate: "Fecha de nacimiento",
    deathdate: "Fecha de fallecimiento"
}

export const BookRegisterSchema = z
  .object({
    
    cover:z
    .any()
    .refine((file) => file?.size <=  5000000, `El tamaño máximo de la imágen es de 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Solo los formatos .jpg, .jpeg, .png and .webp son aceptados."
    ),

    name: z
      .string()
      .min(1, { message: "Campo requerido" })
      .min(1, { message: "Minimo 1 carácter" })
      .max(50, { message: "Maximo 50 carácteres" }),

    AuthorName: z
      .string()
      .min(1, { message: "Campo requerido" })
      .min(1, { message: "Minimo 10 carácteres" })
      .max(50, { message: "Maximo 50 carácteres" }),

    AuthorLastName: z
      .string()
      .min(1, { message: "Campo requerido" })
      .min(1, { message: "Minimo 10 carácteres" })
      .max(50, { message: "Maximo 50 carácteres" }),
    
    AuthorBirthDate: z
      .string()
      .refine((date) => new Date(date).toString() !== "Invalid Date", {message: "Ingrese una fecha válida"}),

    AuthorDeathDate: z
      .string()
      .refine((date) => new Date(date).toString() !== "Invalid Date", {message: "Ingrese una fecha válida"}),

    genre: z
      .string()
      .min(1, { message: "Campo requerido" })
      .min(5, { message: "Minimo 5 carácteres" })
      .max(50, { message: "Máximo de 50 carácteres" }),

    publishDate:z
      .string()
      .refine((date) => new Date(date).toString() !== "Invalid Date", {message: "Ingrese una fecha válida"}),

    publisher: z
      .string()
      .min(1, { message: "Campo requerido" })
      .min(5, { message: "Minimo 5 carácteres" })
      .max(50, { message: "Máximo de 50 carácteres" }),

    rating: z
      .string()
      .refine((num) => !isNaN(parseFloat(num)), {message: "La valoración debe ser un valor numérico"})
      .refine((num) => parseFloat(num) >= 0 &&  parseFloat(num) <= 10, {message: "La valoración debe ser del 0 al 10"}),
        
  });
