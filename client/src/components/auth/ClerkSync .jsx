import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import supabase from "../../utils/supabase";

const ClerkSync = () => {
  const { user, isSignedIn } = useAuth();

  useEffect(() => {
    const syncUserToSupabase = async () => {
      if (user && isSignedIn) {
        console.log("Usuario de Clerk disponible:", user);
        try {
          const { id, first_name, last_name, email_addresses, image_url } = user;
          const email = email_addresses[0]?.email_address;
          const full_name = `${first_name || ""} ${last_name || ""}`.trim();
          const avatar_url = image_url || "https://www.gravatar.com/avatar?d=mp";

          // verifica si el usuario ya existe
          const { data: existingUser, error: fetchError } = await supabase
            .from("users")
            .select("id_uuid")
            .eq("clerk_id", id)
            .single();

          if (fetchError && fetchError.code !== "PGRST116") {
            console.error("Error verificando usuario existente:", fetchError.message);
            return;
          }
          // si el usuario no existe, insertarlo
          if (!existingUser) {
            const id_uuid = uuidv4(); // genera un UUID único para el usuario

            const { error: insertError } = await supabase.from("users").insert({
              id_uuid,
              clerk_id: id,
              email,
              full_name,
              avatar_url,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });

            if (insertError) {
              console.error("Error al insertar usuario en Supabase:", insertError.message);
            } else {
              console.log("Usuario sincronizado con éxito en Supabase:", id_uuid);
            }
          } else {
            console.log("Usuario ya existe en la base de datos:", existingUser.id_uuid);
          }
        } catch (error) {
          console.error("Error sincronizando usuario con Supabase:", error.message);
        }
      }
    };

    syncUserToSupabase();
  }, [user, isSignedIn]);

  return null;
};


export default ClerkSync;
