import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const adminUser = {
    name: "Aswin",
    password: "1234",
  };

  const login = (details) => {
    console.log(details);
    if (
      details.name === adminUser.name &&
      details.password === adminUser.password
    ) {
      navigate("/home");
    } else {
      alert("Invalid Login Credentials");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(details);
  };
  const [details, setDetails] = useState({ name: "", password: "" });
  return (
    <div className="wrapper">
      <h3 class="m-3">Project Mananger</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          name="username"
          placeholder="Username"
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
          value={details.name}
        />
        <br />
        <br />
        <input
          type="password"
          required
          name="password"
          placeholder="Password"
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
          value={details.password}
        />
        <br />
        <br />
        <input class="btn btn-primary p-0 px-1" type="submit" value="Login" />
      </form>
    </div>
  );
};
export default Login;
