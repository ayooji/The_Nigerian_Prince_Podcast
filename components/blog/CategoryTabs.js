import React, { useState, useRef, useEffect } from "react";
import { Tabs, Tab, Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const categories = [
  "Tech Innovations",
  "MMA Arena",
  "Entertainment Buzz",
  "Health & Fitness Guide",
  "Personal Development",
  "Current Events Digest",
  "Business & Finance Insights",
  "Entrepreneurship",
  "Food & Nutrition",
  "Agriculture & Farming",
  "Science Discoveries",
  "Street OT Chronicles",
];

const CategoryTabs = ({ onCategoryChange }) => {
  const [value, setValue] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tabsRef = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onCategoryChange(categories[newValue]);
    router.push(`/blog/category/${encodeURIComponent(categories[newValue])}`);
  };

  return (
    <Box sx={{ width: "100%", mt: 3, mb: 3, position: "relative" }}>
      <Tabs
        ref={tabsRef}
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="category tabs"
        textColor="inherit"
        indicatorColor="primary"
        centered={!isMobile}
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#00FF00",
            height: "4px",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "0.85rem",
            margin: "0 5px",
            color: "white",
            border: "1px solid #00FF00",
            borderRadius: "20px",
            minWidth: "100px",
            "&.Mui-selected": {
              color: "#00FF00",
              borderColor: "#00FF00",
            },
            "&:hover": {
              color: "#00FF00",
              opacity: 1,
              transition: "color 0.3s, transform 0.3s",
              transform: "scale(1.05)",
              backgroundColor: "rgba(0, 255, 0, 0.1)",
            },
          },
        }}
      >
        {categories.map((category, index) => (
          <Tab
            key={index}
            label={category}
            sx={{
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CategoryTabs;
