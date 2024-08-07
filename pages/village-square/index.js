import React, { useState, useEffect } from "react";
import {
  Grid,
  Text,
  Spacer,
  Card,
  Button,
  Modal,
  Input,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Flag from "react-world-flags";
import { supabase } from "@/lib/supabaseClient";
import Head from "next/head";
import Footer from "@/components/Footer";
import AuthButtons from "@/components/AuthButtons";

const VillageSquare = () => {
  const [visible, setVisible] = useState(false);
  const [authVisible, setAuthVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    format: "",
    file: null,
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [canSubmit, setCanSubmit] = useState(true);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user:", userError.message);
        return;
      }
      if (user) {
        console.log("Fetched user:", user);
        setCurrentUser(user);
        await checkLastSubmission(user.id);
      }
    };

    const checkLastSubmission = async (userId) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("submission_time")
        .eq("user_id", userId)
        .single();  // Use single() to get exactly one row

      if (error) {
        console.error("Error fetching submission time:", error.message);
        return;
      }

      console.log("Fetched submission time:", data);

      if (data && data.submission_time) {
        const lastSubmissionTime = new Date(data.submission_time);
        const currentTime = new Date();
        const timeDiff = Math.abs(currentTime - lastSubmissionTime);
        const oneDay = 24 * 60 * 60 * 1000;

        if (timeDiff < oneDay) {
          setCanSubmit(false);
        } else {
          setCanSubmit(true);
        }
      } else {
        setCanSubmit(true);
      }
    };

    fetchUser();
  }, []);

  const closeHandler = () => {
    setVisible(false);
  };

  const closeAuthHandler = () => {
    setAuthVisible(false);
  };

  const submitHandler = async () => {
    const { title, content, format, file } = formData;
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
    if (sessionError) {
      console.error("Error fetching session:", sessionError.message);
      setAuthVisible(true); // Show the auth modal if there's an error fetching session
      return;
    }
  
    if (!session || !session.user) {
      setAuthVisible(true); // Show the auth modal if no session or user is found
      return;
    }
  
    const user = session.user;
  
    console.log("Submitting user:", user);
  
    if (!title || !content || !format) {
      alert("Please fill in all the fields.");
      return;
    }
  
    const user_id = user.id;
  
    const { data: submissions, error: submissionError } = await supabase
      .from("submissions")
      .select("created_at")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false })
      .limit(1);
  
    if (submissionError) {
      console.error("Error checking last submission:", submissionError.message);
      return;
    }
  
    console.log("Last submission data:", submissions);
  
    if (submissions && submissions.length > 0) {
      const lastSubmissionTime = new Date(submissions[0].created_at);
      const currentTime = new Date();
      const timeDiff = Math.abs(currentTime - lastSubmissionTime);
      const oneDay = 24 * 60 * 60 * 1000;
  
      if (timeDiff < oneDay) {
        alert("You can only submit once per day.");
        return;
      }
    }
  
    let fileUrl = null;
  
    if (file) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(`public/${file.name}`, file);
  
      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        return;
      }
  
      fileUrl = uploadData.Key;
    }
  
    const { data, error } = await supabase
      .from("submissions")
      .insert([{ title, content, format, user_id, file_url: fileUrl, created_at: new Date().toISOString() }]);
  
    if (error) {
      console.error("Error submitting data:", error);
      return;
    }
  
    console.log("Data submitted successfully:", data);
  
    // Update the submission_time in profiles table
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ submission_time: new Date().toISOString() })
      .eq("user_id", user_id);
  
    if (updateError) {
      console.error("Error updating submission time:", updateError.message);
      return;
    }
  
    alert("Your content has been submitted!");
    setVisible(false);
    setFormData({ title: "", content: "", format: "", file: null });
    setCanSubmit(false);
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const cardStyle = {
    background: "linear-gradient(45deg, $black -20%, $green500 50%)",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease",
  };

  const cardHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.25)",
  };

  const textStyle = {
    lineHeight: "1.6",
    color: "white",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
    fontSize: "18px",
  };

  const buttonStyle = {
    background: "linear-gradient(145deg, #fdcb6e, #e17055)",
    border: "none",
    borderRadius: "20px",
    padding: "10px 20px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
  };

  const buttonHoverStyle = {
    transform: "scale(1.05)",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
  };

  const countries = [
    "US",
    "NG",
    "GB",
    "CA",
    "FR",
    "DE",
    "GH",
    "CI",
    "BR",
    "AU",
    "PT",
    "CM",
    "ES",
    "JP",
    "IT",
    "IN",
    "KE",
    "ZA",
    "SG",
    "AE",
    "NL",
    "CH",
    "SE",
    "FI",
    "NO",
    "DK",
    "IE",
    "MY",
    "PH",
    "MX",
  ]; // Example list of country codes

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>The Village Square - The Nigerian Prince Podcast</title>
        <meta
          name="description"
          content="Welcome to The Village Square, a platform for sharing diverse perspectives and unseen narratives. Submit your stories in text, audio, video, or images and be part of the global conversation."
        />
        <meta
          property="og:title"
          content="The Village Square - The Nigerian Prince Podcast"
        />
        <meta
          property="og:description"
          content="Welcome to The Village Square, a platform for sharing diverse perspectives and unseen narratives. Submit your stories in text, audio, video, or images and be part of the global conversation."
        />
        <meta
          property="og:url"
          content="https://www.nigerianprincepodcast.com/village-square"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.nigerianprincepodcast.com/heroImage.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="The Village Square - The Nigerian Prince Podcast"
        />
        <meta
          name="twitter:description"
          content="Welcome to The Village Square, a platform for sharing diverse perspectives and unseen narratives. Submit your stories in text, audio, video, or images and be part of the global conversation."
        />
        <meta
          name="twitter:image"
          content="https://www.nigerianprincepodcast.com/heroImage.jpg"
        />
      </Head>
      <Spacer y={1} />

      {/* Header and Welcome Section */}
      <Grid.Container gap={2} justify="center">
        <Text
          h1
          className="text-white text-4xl my-8"
          weight="bold"
          css={{ textAlign: "center" }}
        >
          Welcome to The Village Square
        </Text>
      </Grid.Container>

      {/* Country Flags Carousel */}
      <Grid.Container gap={2} justify="center">
        <Grid xs={12}>
          <Card variant="bordered" css={{ bg: "$black", w: "100%" }}>
            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={1600}
              removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
              draggable={true}
            >
              {countries.map((country) => (
                <div
                  key={country}
                  style={{ padding: "10px", textAlign: "center" }}
                >
                  <Flag
                    code={country}
                    style={{ width: "60px", height: "60px" }}
                  />
                </div>
              ))}
            </Carousel>
          </Card>
        </Grid>
      </Grid.Container>

      <Spacer y={1} />

      {/* Submission Focus Section */}
      <Grid.Container gap={2} justify="center">
        <Grid md={6} xs={12}>
          <Card
            variant="bordered"
            css={cardStyle}
            onMouseOver={(e) => (e.currentTarget.style = cardHoverStyle)}
            onMouseOut={(e) => (e.currentTarget.style = cardStyle)}
          >
            <Card.Body css={{ textAlign: "center", padding: "20px" }}>
              <Text blockquote size={20}>
                At The Village Square, your stories bring to light diverse
                perspectives and unseen narratives. Ayo Oji invites you to share
                your experiences, insights, and news that resonate with your
                life and your community. Whether you’re documenting a local
                event, sharing a cultural insight, or telling a personal story,
                your contributions are invaluable.
              </Text>
              <Text css={{ ...textStyle, marginTop: "10px" }}>
                Submissions can be made in various formats—text, audio, video,
                or images. Each submission is carefully reviewed by Ayo Oji to
                ensure it aligns with our values of respect, diversity, and
                authenticity. Stories that meet these criteria will not only be
                shared on our platform but will also help shape the global
                narrative and foster a deeper understanding among our listeners.
              </Text>
              <Spacer x={0.5} />
              <Grid.Container justify="center">
                <Tooltip
                  content="You can submit once a day or after your previous submission has been reviewed."
                  visible={tooltipVisible}
                >
                  <Button
                    color="gradient"
                    auto
                    ghost
                    size="lg"
                    onMouseOver={(e) =>
                      (e.currentTarget.style = buttonHoverStyle)
                    }
                    onMouseOut={(e) => (e.currentTarget.style = buttonStyle)}
                    onPress={() => setVisible(true)}
                    disabled={!canSubmit}
                  >
                    Submit Your Story
                  </Button>
                </Tooltip>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>

      {/* Submission Modal */}
      <Modal open={visible} onClose={closeHandler} closeButton>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Submit Your Story
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            size="lg"
            label="Title"
            placeholder="Enter your story title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Textarea
            clearable
            bordered
            fullWidth
            size="lg"
            label="Content"
            placeholder="Enter your story content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />
          <Input
            clearable
            bordered
            fullWidth
            size="lg"
            label="Format"
            placeholder="Text, Audio, Video, Image"
            value={formData.format}
            onChange={(e) =>
              setFormData({ ...formData, format: e.target.value })
            }
          />
          <Input
            type="file"
            fullWidth
            size="lg"
            label="Upload File"
            onChange={handleFileChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Cancel
          </Button>
          <Button auto onPress={submitHandler}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Auth Modal */}
      <Modal open={authVisible} onClose={closeAuthHandler} closeButton>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Please Sign In or Sign Up
          </Text>
        </Modal.Header>
        <Modal.Body>
          <AuthButtons />
        </Modal.Body>
      </Modal>

      {/* Footer */}
      <Spacer x={5} />
      <Footer />
    </div>
  );
};

export default VillageSquare;
