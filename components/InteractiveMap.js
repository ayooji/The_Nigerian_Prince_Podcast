import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icon for map markers
const customIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "/marker-shadow.png",
  shadowSize: [41, 41],
});

const locations = [
  { lat: 6.5244, lng: 3.3792, country: "Nigeria" },
  { lat: 40.7128, lng: -74.006, country: "USA" },
  { lat: 51.5074, lng: -0.1278, country: "UK" },
  { lat: 48.8566, lng: 2.3522, country: "France" },
  // Add more locations as needed
];

const InteractiveMap = () => {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.lat, location.lng]}
          icon={customIcon}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Popup>{location.country}</Popup>
          </motion.div>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default InteractiveMap;
