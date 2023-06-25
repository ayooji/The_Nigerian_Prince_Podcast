import React, { useState } from "react";
import Link from "next/link";
import { Button, Spacer, Grid, Text } from "@nextui-org/react";
import { motion, useMotionValue } from "framer-motion";

export const categories = [
  "Tech Innovations",
  "MMA Arena",
  "Entertainment Buzz",
  "Health & Fitness Guide",
  "Personal Growth Journey",
  "Current Events Digest",
  "Business & Finance Insights",
  "Travel Adventures",
  "Education Corner",
  "Lifestyle Trends",
  "Food & Drink Recipes",
  "Agriculture & Farming",
  "Science Discoveries",
  "Sports World",
  "Arts & Culture Scene",
  "Street OT Chronicles",
];

const CategoryTabs = ({ onCategoryChange }) => {
  const hoverVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#6EFFA2", // Replace with desired shining green color
      boxShadow: "0px 4px 20px rgba(110, 255, 162, 0.4)",
      transition: { duration: 0.3, ease: "easeInOut" },
      rotate: -10,
      maskimage:
        "linear-gradient(to right, transparent 50%, rgba(0, 128, 0, 1) 50%)",
      masksize: "500%",
      maskposition: "0",
    },
  };

  return (
    <Grid.Container gap={2} justify="center">
      {categories.map((category) => (
        <Link
          href={`/blog/category/${encodeURIComponent(category)}`}
          key={category}
        >
          <Grid.Container gap={2} justify="center">
            <Grid xs={24} md={12}>
              <motion.div
                style={{ display: "block", width: "100%" }}
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={{ ...hoverVariants }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={() => onCategoryChange(category)}
              >
                <Button auto size="sm" color="success" shadow bordered ghost>
                  {category}
                </Button>
              </motion.div>
            </Grid>
          </Grid.Container>
          <Spacer y={0.5} />
        </Link>
      ))}
    </Grid.Container>
  );
};

export default CategoryTabs;
