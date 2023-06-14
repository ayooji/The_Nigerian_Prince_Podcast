import React, { useState, useEffect } from "react";
import { Modal, Button, Image, Text, Link } from "@nextui-org/react";
import guests from "../public/guests.json";

import { AiOutlineUser, AiOutlineClose } from "react-icons/ai";

const GuestButton = ({ episodeId }) => {
  const guest = getGuestByEpisodeId(episodeId);
  const [visible, setVisible] = useState(false);

  function getGuestByEpisodeId(episodeId) {
    return guests.find((guest) => guest.episodeId === episodeId);
  }

  if (!guest) return null; // Don't show GuestButton if guest is not found

  const openModal = (e) => {
    e.stopPropagation(); // Prevent triggering the Card click event
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <>
      <button onClick={openModal} className="focus:outline-none">
        <AiOutlineUser size="1.5em" className="text-white" />
      </button>
      <Modal noPadding open={visible} onClose={closeModal}>
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={(e) => e.stopPropagation()}
        ></div>
        <button
          className="absolute top-0 right-0 p-4"
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
        >
          <AiOutlineClose className="text-white" />
        </button>
        <Modal.Body>
          <Image
            showSkeleton
            alt="The Nigerian Prince Podcast - Guest"
            src={guest.image}
            width={400}
            height={490}
          />
        </Modal.Body>
        <Modal.Footer>
          <Text color="success">
            {guest.name} - {guest.bio}
          </Text>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GuestButton;
