export const fetchCityAndCountry = async (latitude, longitude) => {
  const apiKey = "43d9ccbcae2840749ff962807ad02815";
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Agregar log para ver la estructura de la respuesta
    console.log("Respuesta de OpenCage:", data);

    if (data.results && data.results.length > 0) {
      const locationData = data.results[0].components;
      const city = locationData.city || locationData.town || locationData.village;
      const country = locationData.country;

      return { city, country, latitude, longitude }; // Devuelve también latitud y longitud
    } else {
      throw new Error("No se pudo obtener la ciudad y el país.");
    }
  } catch (error) {
    console.error("Error en la geocodificación:", error);
    throw error;
  }
};
