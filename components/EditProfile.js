import React, { useState, useEffect } from "react";
import {
  Grid,
  Text,
  Spacer,
  Input,
  Textarea,
  Button,
  Image,
  Card,
  Modal,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import { useDropzone } from "react-dropzone";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const EditProfile = ({ currentUser }) => {
  console.log("EditProfile currentUser:", currentUser);
  const router = useRouter();
  // Add your component state and logic here
  // ...
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [localImageUrl, setLocalImageUrl] = useState(""); //
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

      console.log("Fetched profile data:", data);

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
    console.log("Deleting existing image...");
    // Delete the existing image if it exists
    await supabase.storage.from("avatars").remove([fileName]);
    console.log("Deleted existing image (if any)");

    console.log("Uploading new image...");
    // Upload the new image
    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (error) {
      console.error("Error uploading image:", error.message);
      return null;
    }
    console.log("Image uploaded");

    return `https://${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}.supabase.co/storage/v1/object/public/avatars/${fileName}`;
  };

  const handleSocialLinksChange = (e) => {
    setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
  };

  // Update the handleSubmit function to update the user's profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const uploadedImageUrl = await handleImageUpload(image);
    if (uploadedImageUrl) {
      setImageUrl(uploadedImageUrl);
    }
    console.log("Updating profile for user_id:", currentUser.id);

    const { data, error } = await supabase.from("profiles").upsert(
      {
        user_id: currentUser.id,
        name,
        image_url: uploadedImageUrl || imageUrl,
        bio,
        social_links: socialLinks,
      },
      { onConflict: "user_id" }
    );

    console.log("Profile update data:", data);
    console.log("Profile update error:", error);

    if (error) {
      console.error("Error updating profile:", error.message);
      setErrorMessage("An error occurred while updating your profile.");
    } else {
      console.log("Profile update data:", data);
      setSuccessMessage("Your profile has been successfully updated!");
    }
  };

  const generateRandomToken = (length = 64) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < length; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  };

  const handleDeleteProfile = async () => {
    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("user_id", currentUser.id);

    if (error) {
      console.error("Error deleting profile:", error.message);
    } else {
      // Invalidate all sessions by updating the user's recovery_token
      const randomToken = generateRandomToken();
      await supabase
        .from("auth.users")
        .update({ data: { recovery_token: randomToken } })
        .match({ id: currentUser.id });

      // Log out the user after deleting the profile
      await supabase.auth.signOut();
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
              {imageUrl && (
                <Image
                  src={imageUrl}
                  width={100}
                  height={100}
                  layout="fixed"
                  alt="Profile image"
                  className="rounded-full"
                />
              )}
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
          <Button
            onClick={() => setShowDeleteModal(true)}
            color="error"
            bordered
          >
            Delete Profile
          </Button>
        </form>
        {/* Add the DeleteModal component */}
        <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Delete Profile
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text>
              Are you sure you want to delete your profile? This action is
              permanent and cannot be undone.
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowDeleteModal(false)} auto size="sm">
              Cancel
            </Button>
            <Spacer />
            <Button onClick={handleDeleteProfile} auto size="sm" color="error">
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        {successMessage && (
          <Text size="1em" color="success">
            {successMessage}
          </Text>
        )}
        {errorMessage && (
          <Text size="1em" color="error">
            {errorMessage}
          </Text>
        )}
      </Grid>
    </Grid.Container>
  );
};

export default EditProfile;
