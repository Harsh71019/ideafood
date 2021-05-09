import React from "react";
import "../styles/adminnav.styles.css";

const AdminDashboardNav = ({ active }) => {
  return (
    <ul className="nav justify-content-center w-100 my-3 admin-nav-main shadow">
      <li className="nav-item">
        <a className="nav-link admin-nav-link active" href="#">
          <span className="admin-span-text">Home</span>
          <i className="admin-nav-icon ml-2 uil uil-estate"></i>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link admin-nav-link" href="#">
          <span className="admin-span-text">Users</span>
          <i className="admin-nav-icon ml-2 uil uil-users-alt green-icon"></i>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link admin-nav-link" href="#">
          <span className="admin-span-text">Orders</span>
          <i className="admin-nav-icon ml-2 uil uil-shop"></i>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link admin-nav-link" href="#">
          <span className="admin-span-text">Messages</span>
          <i className="admin-nav-icon ml-2 uil uil-envelope-question"></i>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link admin-nav-link" href="#">
          <span className="admin-span-text">Products</span>
          <i className="admin-nav-icon ml-2 uil uil-notes"></i>
        </a>
      </li>
    </ul>
  );
};

export default AdminDashboardNav;
