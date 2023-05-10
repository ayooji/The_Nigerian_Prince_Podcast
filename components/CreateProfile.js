import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import { Button, Input, Grid, Text, Spacer, Textarea } from "@nextui-org/react";
import React, { useState } from "react";

const CreateProfile = ({ currentUser }) => {
    console.log("CreateProfile currentUser:", currentUser);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
      router.push("/episode");
    }
  };

  const handleSocialLinksChange = (e) => {
    setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
  };

  return (
    <Grid.Container alignItems="center" justify="center" direction="column">
      <Spacer />
      <Text h3>Create your profile</Text>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Spacer />
        <Input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Spacer />
        <Textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <Spacer />
        <Input
          placeholder="Twitter URL"
          name="twitter"
          value={socialLinks.twitter || ""}
          onChange={(e) => handleSocialLinksChange(e)}
        />
        <Spacer />
        <Input
          placeholder="Facebook URL"
          name="facebook"
          value={socialLinks.facebook || ""}
          onChange={(e) => handleSocialLinksChange(e)}
        />
        <Spacer />
        <Input
          placeholder="Instagram URL"
          name="instagram"
          value={socialLinks.instagram || ""}
          onChange={(e) => handleSocialLinksChange(e)}
        />
        <Spacer />
        <Button
          disabled={isLoading}
          type="submit"
          color="gradient"
          loading={isLoading}
        >
          Save
        </Button>
      </form>
    </Grid.Container>
  );
};

export default CreateProfile;
