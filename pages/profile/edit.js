import EditProfile from "@/components/EditProfile";
import { supabase } from "@/lib/supabaseClient";

const EditProfilePage = () => {
  const currentUser = supabase.auth.currentUser;
  return <EditProfile currentUser={currentUser} />;
};

export default EditProfilePage