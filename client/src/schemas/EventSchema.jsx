import * as yup from "yup";

export const eventSchema = yup.object().shape({
  image: yup.mixed().test("fileSize", "La imagen es requerida", (value) => {
    return value && value.length > 0;
  }),
  name: yup.string().required("El nombre del evento es requerido*"),
  gender: yup
  .string()
  .oneOf(['male', 'female', 'unisex', 'other'], 'Género inválido')
  .required("Debes completar este campo*"),
  description: yup.string().required("Debes completar este campo*"),
  age: yup
    .number()
    .typeError("La edad debe ser un número*")
    .integer()
    .positive()
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
    .required("Fecha de inicio es requerida*"),
  start_time: yup
    .string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Hora inválida*")
    .required("Hora de inicio es requerida*"),
});
