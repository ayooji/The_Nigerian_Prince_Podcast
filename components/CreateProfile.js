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

    console.log("Calling handleImageUpload with image:", image);
    const uploadedImageUrl = await handleImageUpload(image);
    console.log("Uploaded image URL:", uploadedImageUrl);

    console.log("Inserting data into profiles table...");
    const { data, error } = await supabase.from("profiles").insert({
      user_id: currentUser.id,
      name,
      image_url: uploadedImageUrl || imageUrl,
      bio,
      social_links: socialLinks,
      country,
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
      }, 3000);
    }
  };

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
            type="text"
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
            type="text"
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
            type="text"
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
            type="text"
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
            type="text"
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
            type="text"
          />
          <Spacer />
          <Button
            disabled={isLoading}
            type="submit"
            color="gradient"
            loading={isLoading ? "true" : undefined}
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
            <p>Creating profile...Please wait!</p>
          </div>
        </>
      )}
    </Grid.Container>
  );
};

export default CreateProfile;
