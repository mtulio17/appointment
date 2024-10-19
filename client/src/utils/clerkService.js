export const getUserDetailsFromClerk = async (userId) => {
    try {
      const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.CLERK_SECRET_KEY}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener los datos del usuario');
      }
  
      const data = await response.json();
      return {
        username: data.full_name || data.first_name || data.username || 'Oculto',
        imageUrl: data.image_url || 'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ybFhDNjUza3R4T1NSVFVVdmEzUXo1blJDeGIiLCJyaWQiOiJ1c2VyXzJsWEZBd2kzZEJDaUZYSGdmdnhEYW04YWhXWSIsImluaXRpYWxzIjoiR1MifQ?width=80'
      };
    } catch (error) {
      // console.error('Error al obtener los detalles del usuario desde Clerk:', error);
      return { username: 'Oculto', imageUrl: 'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ybFhDNjUza3R4T1NSVFVVdmEzUXo1blJDeGIiLCJyaWQiOiJ1c2VyXzJsWEZBd2kzZEJDaUZYSGdmdnhEYW04YWhXWSIsImluaXRpYWxzIjoiR1MifQ?width=80' };
    }
  };
  