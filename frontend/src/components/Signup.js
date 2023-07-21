import React, { useState } from "react";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const getData = () => {
    console.log(name, email, password);
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter name"
      />
      <input
        className="inputBox"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter email"
      />
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Enter password"
      />
      <button className="signUpBtn" type="button" onClick={getData}>
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
