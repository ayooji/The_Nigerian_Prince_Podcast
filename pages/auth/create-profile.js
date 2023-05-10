import CreateProfile from "@/components/CreateProfile";
import { supabase } from "@/lib/supabaseClient";
const CreateProfilePage = () => {
  const currentUser = supabase.auth.currentUser;
  return <CreateProfile currentUser={currentUser} />;
};

export default CreateProfilePage;
