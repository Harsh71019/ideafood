import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import SearchIcon from "../images/SearchIcon.svg";
import "../styles/nav.styles.css";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push(`/`);
    }
  };

  return (
    <Form onSubmit={submitHandler} inline className="searchbox-main-div">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products"
        className="mr-sm-2 ml-sm-5 nav-font-styles bg-searchbox"
      ></Form.Control>
      <span onClick={submitHandler}>
        <img className="search-icon-css" src={SearchIcon} alt="Search" />
      </span>
      {/* <Button type="submit" variant="outline-success" className="">
        Search
      </Button> */}
    </Form>
  );
};

export default SearchBox;
