export const formatPrice = (price) => {
    if (price === 0) return "GRATIS";
  
    const hasCents = price % 1 !== 0; // verificar si hay partes decimales
  
    const formattedPrice = price.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: hasCents ? 2 : 0,
      maximumFractionDigits: 2,
    });
  
    return `${formattedPrice} ARS`; // agrega el "ARS" manualmente
  };
  