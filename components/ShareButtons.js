import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { IoShareSocial, IoSquare } from 'react-icons/io5';
import { RiFacebookFill, RiTwitterFill, RiWhatsappFill } from 'react-icons/ri'
import React, { useState, useEffect } from "react";
import {
    Card,
    Text,
    Image,
    Grid,
    Spacer,
    Loading,
    Row,
    Button
  } from "@nextui-org/react";
const ShareButtons = ({ url, title }) => {
    const [showShareButtons, setShowShareButtons] = useState(false);
  
    const toggleShareButtons = (e) => {
      e.stopPropagation(); // Prevent triggering the Card click event
      setShowShareButtons(!showShareButtons);
    };
  
    return (
      <div className="relative inline-block">
        <button onClick={toggleShareButtons} className="focus:outline-none">
          <IoShareSocial size="1.5em" className="text-white" />
      </button>
      {showShareButtons && (
        <div className="absolute z-10 -right-4 mt-2 bg-gray-700 rounded-lg shadow-lg p-2">
          <FacebookShareButton url={url} quote={title}>
            <RiFacebookFill className="text-blue-600 text-2xl mx-1 hover:text-blue-800 cursor-pointer" />
          </FacebookShareButton>
          <TwitterShareButton url={url} title={title}>
            <RiTwitterFill className="text-blue-400 text-2xl mx-1 hover:text-blue-600 cursor-pointer" />
          </TwitterShareButton>
          <WhatsappShareButton url={url} title={title}>
            <RiWhatsappFill className="text-green-600 text-2xl mx-1 hover:text-green-800 cursor-pointer" />
          </WhatsappShareButton>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;