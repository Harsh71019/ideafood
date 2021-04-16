import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title> {title}</title>
      <meta name="description" content={description}></meta>
      <meta name="keywords" content={keywords}></meta>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to Ideafod",
  keywords: "food home natural",
  description: "Hey we sell homemade food for cheap and healthh stuff",
};

export default Meta;
