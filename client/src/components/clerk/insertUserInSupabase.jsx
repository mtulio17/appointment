import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import supabase from '../../utils/supabase';

const InsertUserInSupabase = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  // función para insertar los datos en Supabase
  const insertUserInSupabase = async (userData) => {
    try {
      const { id, firstName, lastName, emailAddresses, imageUrl } = userData;
      const email = emailAddresses[0]?.emailAddress;

      const { data, error } = await supabase
        .from('users') 
        .insert([
          {
            id_uuid: id, 
            clerk_id: id, 
            avatar_url: imageUrl || null,
            full_name: `${firstName} ${lastName}`,
            first_name: firstName,
            email: email,
            created_at: new Date(),
            updated_at: new Date(),
          }
        ]);

      if (error) {
        console.error("Error inserting user in Supabase:", error);
      } else {
        console.log("User inserted successfully:", data);
      }
    } catch (err) {
      console.error("Error during user insertion:", err);
    }
  };

  // efecto para insertar el usuario en Supabase cuando se haya cargado el usuario
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      insertUserInSupabase(user);
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return null;
};

export default InsertUserInSupabase;
