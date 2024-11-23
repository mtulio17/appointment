import { useSession } from "@clerk/clerk-react";
import { useEffect } from "react";
import supabase from "../../utils/supabase";

const SyncSession = () => {
  const { session, isSignedIn } = useSession();

  // método para insertar o actualizar el usuario en Supabase
  const upsertUserInSupabase = async (userData) => {
    try {
      const { firstName, fullName, avatarUrl } = userData;
      // verifica si el usuario ya existe en la tabla de 'users' por el clerk_id
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('clerk_id')
        .eq('clerk_id', session.user.id)
        .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116: No rows found
          console.error("Error fetching user:", fetchError);
          return;
        }

        if (existingUser) {
          // si el usuario existe, actualizamos sus datos
          const { data, error } = await supabase
            .from('users')
            .update({
              avatar_url: avatarUrl || null,
              full_name: fullName || null,
              first_name: firstName || null,
              updated_at: new Date(),
            })
            .eq('clerk_id', session.user.id); // Filtramos por el clerk_id

            if (error) {
              console.error("Error updating user in Supabase:", error);
            } else {
              console.log("User updated successfully:", data);
                }
          } else {
            // Si el usuario no existe, lo insertamos
            const { data, error } = await supabase
              .from('users')
              .insert([
                {
                  clerk_id: session.user.id,
                  avatar_url: avatarUrl || null,
                  full_name: fullName || null,
                  first_name: firstName || null,
                  created_at: new Date(),
                  updated_at: new Date(),
                }
              ]);

            if (error) {
              console.error("Error inserting user in Supabase:", error);
            } else {
              console.log("User inserted successfully:", data);
            }
          }
        } catch (err) {
          console.error("Error during user upsert:", err);
        }
      };

    useEffect(() => {
      if (session && isSignedIn) {
        // Obtener datos del usuario desde la sesión de Clerk
        const user = session.user;

        if (user) {
          // Insertar o actualizar el usuario en Supabase
          upsertUserInSupabase({
            firstName: user.firstName,
            fullName: user.fullName,
            avatarUrl: user.imageUrl || null,
          });
          console.log("Sesión sincronizada con Supabase");
        } else {
          console.log("Usuario no disponible");
        }
      } else {
        console.log("Esperando sesión...");
      }
    }, [session, isSignedIn]);

    return null;
  };

export default SyncSession;
