import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import {
  Button,
  Input,
  Grid,
  Text,
  Spacer,
  Textarea,
  Card,
} from "@nextui-org/react";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import SuccessModal from "./SuccessModal";

const CreateProfile = ({ currentUser }) => {
  console.log("CreateProfile currentUser:", currentUser);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.from("profiles").insert({
      user_id: currentUser.id,
      name,
      image_url: imageUrl,
      bio,
      social_links: socialLinks,
    });

    console.log("Profile creation data:", data);
    console.log("Profile creation error:", error);

    if (error) {
      console.error("Error creating profile:", error.message);
      setIsLoading(false);
    } else {
      setShowSuccessModal(true);
      setTimeout(() => {
        router.push("/episode");
      }, 3000); // Adjust the delay as needed
    }
  };

  const handleSocialLinksChange = (e) => {
    setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
  };

  return (
    <Grid.Container alignItems="center" justify="center" direction="column">
      <Spacer />
      <Text h3>Create your profile</Text>
      <Grid>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
          />
          <Spacer />
          <Input
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
          />
          <Spacer />
          <Textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 block w-full"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
          />
          <Spacer />
          <Input
            placeholder="Twitter URL"
            name="twitter"
            value={socialLinks.twitter || ""}
            onChange={(e) => handleSocialLinksChange(e)}
            className="mt-1 block w-full"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
          />
          <Spacer />
          <Input
            placeholder="Facebook URL"
            name="facebook"
            value={socialLinks.facebook || ""}
            onChange={(e) => handleSocialLinksChange(e)}
            className="mt-1 block w-full"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
          />
          <Spacer />
          <Input
            placeholder="Instagram URL"
            name="instagram"
            value={socialLinks.instagram || ""}
            onChange={(e) => handleSocialLinksChange(e)}
            className="mt-1 block w-full"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
          />
          <Spacer />
          <Button
            disabled={isLoading}
            type="submit"
            color="gradient"
            loading={isLoading}
            bordered
          >
            Save
          </Button>
        </form>
        {/* Add the SuccessModal component */}
        <SuccessModal isOpen={showSuccessModal} />
       
        
      </Grid>
      {isLoading && (
          <>
            <div className="loading-overlay" />
            <div className="loading-container">
              <ClipLoader size={50} />
              <p>Creating profile...</p>
            </div>
          </>
        )}
    </Grid.Container>
  );
};

export default CreateProfile;
