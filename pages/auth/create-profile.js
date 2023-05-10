import { useState, useEffect } from "react";
import CreateProfile from "@/components/CreateProfile";
import { supabase } from "@/lib/supabaseClient";

const CreateProfilePage = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const setUser = async () => {
      const user = supabase.auth.currentUser;
      setCurrentUser(user);
    };

    // Check and set user when component mounts
    setUser();

    // Subscribe to auth state changes
    supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user);
    });

    // No need to unsubscribe in this case
  }, []);

  // Render the CreateProfile component only when currentUser is available
  return currentUser ? <CreateProfile currentUser={currentUser} /> : null;
};

export default CreateProfilePage;