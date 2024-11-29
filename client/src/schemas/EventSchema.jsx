import * as yup from "yup";

export const eventSchema = (isCreating) => {
  return yup.object().shape({
    image: isCreating
      ? yup
          .mixed()
          .test("fileSize", "La imagen es requerida", (value) => {
            return value && value.length > 0;
          })
      : yup.mixed().nullable(),
  name: yup.string().required("El nombre del evento es requerido*"),
  gender: yup
  .string()
  .oneOf(['male', 'female', 'unisex', 'other'], 'Por favor, selecciona un género válido.')
  .required("Debes completar este campo*"),
  description: yup.string().required("Debes completar este campo*"),
  age: yup
    .number()
    .typeError("La edad debe ser un número*")
    .integer()
    .positive("La edad debe ser mayor a 0.*")
    .max(100, "La edad no puede ser mayor a 100*")
    .required("Debes completar este campo*"),
  category_id: yup.number().required("Debes completar este campo*"),
  price: yup
    .number()
    .typeError("Precio debe ser un número*")
    .min(0, "El precio debe ser al menos 0*")
    .required("Debes completar este campo*"),
  address: yup.string().required("Debes completar este campo*"),
  country: yup.string().required("Debes completar este campo*"),
  city: yup.string().required("Debes completar este campo*"),
  start_date: yup
  .date()
  .min(new Date(), "La fecha no puede estar en el pasado*")
  .max(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    "La fecha debe ser dentro del próximo año*"
  )
  .required("Fecha de inicio es requerida*"),
  start_time: yup
    .string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Hora inválida*")
    .required("Hora de inicio es requerida*"),
});
}