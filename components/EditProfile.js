import React, { useState, useEffect } from "react";
import {
  Grid,
  Text,
  Spacer,
  Input,
  Textarea,
  Button,
  Image,
  Card
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import { useDropzone } from "react-dropzone";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const EditProfile = ({ currentUser }) => {
  // Add your component state and logic here
  // ...
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [localImageUrl, setLocalImageUrl] = useState(""); //
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png, image/gif, image/webp",
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setLocalImageUrl(URL.createObjectURL(acceptedFiles[0]));
        setImage(acceptedFiles[0]);
      }
    },
  });
  // Fetch the current user's profile and pre-fill the form fields
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", currentUser.id)
        .single();

      if (data) {
        setName(data.name);
        setImageUrl(data.image_url);
        setBio(data.bio);
        setSocialLinks(data.social_links);
      } else {
        console.error("Error fetching profile:", error?.message);
      }
    };

    if (currentUser) {
      fetchProfile();
    }
  }, [currentUser]);

  const handleImageUpload = async (file) => {
    if (!file) {
      return null;
    }

    const fileName = `${currentUser.id}/${file.name}`;
    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (error) {
      console.error("Error uploading image:", error.message);
      return null;
    }

    return `https://${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}.supabase.in/storage/v1/object/public/avatars/${fileName}`;
  };

  const handleSocialLinksChange = (e) => {
    setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
  };

  // Update the handleSubmit function to update the user's profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedImageUrl = await handleImageUpload(image);
    if (uploadedImageUrl) {
      setImageUrl(uploadedImageUrl);
    }
    const { data, error } = await supabase
      .from("profiles")
      .update({
        name,
        image_url: uploadedImageUrl || imageUrl,
        bio,
        social_links: socialLinks,
      })
      .eq("user_id", currentUser.id);

    console.log("Profile update data:", data);
    console.log("Profile update error:", error);
  };

  const handleDeleteProfile = async () => {
    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("user_id", currentUser.id);

    if (error) {
      console.error("Error deleting profile:", error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <Grid.Container alignItems="center" justify="center" direction="column">
      <Spacer />
      <Text h3>Edit your Profile</Text>
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
            {...getRootProps()}
            placeholder={
              isDragActive ? "Drop image" : "Drag or click to select image"
            }
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
          />
          <input {...getInputProps()} />
          <Spacer />
          <Grid>
          <Card isHoverable variant="bordered">
          {localImageUrl && (
            <Card.Image
              src={localImageUrl}
              width={100}
              height={100}
              layout="fixed"
              alt="Uploaded avatar"
              className="rounded-full"
            />
          )}
          </Card>
          </Grid>
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
          <Button type="submit" color="gradient" bordered>
            Save
          </Button>
          <Spacer />
          <Button onClick={handleDeleteProfile} color="error" bordered>
            Delete Profile
          </Button>
        </form>
        {/* Add the SuccessModal component */}
      </Grid>
    </Grid.Container>
  );
};

export default EditProfile;
