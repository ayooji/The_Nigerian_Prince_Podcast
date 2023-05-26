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
import React, { useState, useEffect, useRef, useDidMountEffect } from "react";
import { ClipLoader } from "react-spinners";
import SuccessModal from "./SuccessModal";
import { useDropzone } from "react-dropzone";
import getConfig from "next/config";
import Select from "react-select";
import { countries } from "countries-list";

const { publicRuntimeConfig } = getConfig();

const CreateProfile = ({ currentUser }) => {
  const countryInputRef = useRef();
  console.log("CreateProfile currentUser:", currentUser);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [localImageUrl, setLocalImageUrl] = useState(""); //
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [country, setCountry] = useState("");

  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name,
  }));

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const uploadedImageUrl = await handleImageUpload(image);
    const avatar_url = await uploadImage(image);
    const { data, error } = await supabase.from("profiles").insert({
      user_id: currentUser.id,
      name,
      image_url: uploadedImageUrl || imageUrl,
      bio,
      social_links: socialLinks,
      country, // Add the country field
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
    // Update user metadata with the new avatar URL
    if (avatar_url) {
      const updates = {
        id: currentUser.id,
        user_metadata: {
          ...currentUser.user_metadata,
          avatar_url: avatar_url,
        },
      };

      let { error, data } = await supabase.from("users").upsert(updates);
      if (error) {
        console.error("Error updating user metadata:", error.message);
        return null;
      }

      // refresh the current user to get the updated metadata
      const { user, error: refreshError } = await supabase.auth.user();
      if (refreshError) {
        console.error("Error refreshing user:", refreshError.message);
        return null;
      }
      setcurrentUser(user);
    }

    return `https://${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}.supabase.co/storage/v1/object/public/avatars/${fileName}`;
  };

  const handleSocialLinksChange = (e) => {
    setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#333",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#555" : "#333",
      color: "white",
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "#333",
      borderColor: "transparent",
      borderWidth: "1px",
      color: "white",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
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
          <Select
            placeholder="Select Country"
            options={countryOptions}
            value={{ value: country, label: country }}
            onChange={(option) => setCountry(option.label)}
            styles={customStyles}
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
