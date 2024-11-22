import { setSupabaseSession } from './supabase';

export const setSupabaseSessionFromClerk = async (session) => {
  try {
    const supabaseAccessToken = await session.getToken({ template: 'supabase' });

    // console.log("Supabase Access Token:", supabaseAccessToken);

    if (supabaseAccessToken) {
      await setSupabaseSession(supabaseAccessToken);
      console.log('Supabase session set successfully.');
    } else {
      console.error('No Supabase access token available.');
    }
  } catch (error) {
    console.error('Error syncing session with Supabase:', error.message);
  }
};
