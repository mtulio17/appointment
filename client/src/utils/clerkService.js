export const getUserDetailsFromClerk = async (userId) => {
    try {
      const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_CLERK_SECRET_KEY}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener los datos del usuario');
      }
  
      const data = await response.json();
      return data.image_url || 'https://img.clerk.com/default-avatar'; // devuelve la imagen o un avatar por defecto
    } catch (error) {
      console.error('Error al obtener los detalles del usuario desde Clerk:', error);
      return 'https://img.clerk.com/default-avatar'; // avatar por default
    }
  };
  