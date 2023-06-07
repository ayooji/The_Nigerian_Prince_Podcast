import React from "react";
import Link from "next/link";
import { Button, Spacer, Grid } from "@nextui-org/react";

const categories = [
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

const CategoryTabs = () => {
  return (
    <Grid.Container gap={2} justify="center">
      {categories.map((category) => (
        <Link
          href={`/blog/category/${encodeURIComponent(category)}`}
          key={category}
        >
          <Grid.Container gap={2} justify="center">
            <Grid xs={24} md={12}>
              <Button auto size="sm" color="primary" shadow bordered ghost>
                {category}
              </Button>
            </Grid>
          </Grid.Container>
          <Spacer y={0.5} />
        </Link>
      ))}
    </Grid.Container>
  );
};

export default CategoryTabs;
