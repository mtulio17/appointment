import { useSession } from "@clerk/clerk-react";
import { useEffect } from "react";
import { setSupabaseSessionFromClerk } from "../../utils/clerkSupabaseIntegration";

const SyncSession = () => {
  const { session, isSignedIn } = useSession();

  useEffect(() => {
    if (session && isSignedIn) {
      setSupabaseSessionFromClerk(session);
      // console.log('Session sincronizada con Supabase');
    }
  }, [session, isSignedIn]);
  

  return null;
};

export default SyncSession;
