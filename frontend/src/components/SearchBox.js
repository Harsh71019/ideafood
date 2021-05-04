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
      <div className="ms-md-auto pe-md-3 d-flex align-items-center">
        <div className="input-group">
            <i onClick={submitHandler} className="fas fa-search search-icon p-2
            " aria-hidden="true"></i>
          <input
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Products"
            className="nav-font-styles bg-searchbox form-control"
          />
        </div>
      </div>
    </Form>
  );
};

export default SearchBox;
