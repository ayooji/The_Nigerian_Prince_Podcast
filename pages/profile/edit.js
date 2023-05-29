import { useState, useEffect } from "react";
import EditProfile from "@/components/EditProfile";
import { supabase } from "@/lib/supabaseClient";

const EditProfilePage = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const onAuthStateChanged = (event) => {
    const { session } = event.detail;
    setCurrentUser(session?.user);
  };

  useEffect(() => {
    // Listen for auth state changes
    window.addEventListener("onAuthStateChanged", onAuthStateChanged);
  // Set initial user data
  setCurrentUser(supabase.auth.currentUser);


    // Cleanup the listener on unmount
    return () => {
      window.removeEventListener("onAuthStateChanged", onAuthStateChanged);
    };
  }, []);

  // Only render EditProfile if currentUser is available
  return currentUser ? <EditProfile currentUser={currentUser} /> : null;
};

export default EditProfilePage;