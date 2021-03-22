import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    mobile: 8169461230,
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Harsh Patel",
    email: "harsh@example.com",
    mobile: 8655841020,
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Fuckka",
    email: "fuck@example.com",
    mobile: 8169946326,
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
