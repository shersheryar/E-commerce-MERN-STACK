import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      <img
        className="logo"
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.K2g31QXAf6Z5F2osqI_n_AHaGL%26pid%3DApi&f=1&ipt=6fde0f81a77d16686d47176ead6004c2e9c626114bfb4d62c2eb2a4983bbe35a&ipo=images"
        alt="logo"
      />
      {auth ? (
        <ul className="nav-bar">
          <li>
            <Link to={"/"}>Products</Link>
          </li>
          <li>
            <Link to={"/add"}>Add Products</Link>
          </li>
          <li>
            <Link to={"/update"}>Update Products</Link>
          </li>
          <li>
            <Link to={"/profile"}>Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to={"/login"}>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-bar nav-right">
          <li>
            <Link to={"/signup"}>Sign up</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
