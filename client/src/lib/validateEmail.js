export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "El email no puede estar vacío.";
  if (!regex.test(email)) return "Por favor, ingresar un email válido.";
  return "";
};
