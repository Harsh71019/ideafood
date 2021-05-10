import React from "react";
import NotFoundCat from "../images/404.png";

const NotFound = () => {
  return (
    <div className="container">
      <div className="col-12 d-flex justify-content-center">
        <img src={NotFoundCat} className="w-100" />
      </div>
    </div>
  );
};

export default NotFound;
