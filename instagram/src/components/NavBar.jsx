import React from 'react'
import "./NavBar.css"

//components
import { NavLink, Link } from 'react-router-dom'
import {BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill} from "react-icons/bs"

const NavBar = () => {
  return (
    <nav id="nav">
      <Link to="/">Instagram</Link>
      <form>
        <BsSearch />
        <input type="text" />
      </form>
      <ul id="nav-links">
        <li>
          <NavLink to="/">
            <BsHouseDoorFill />
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">Entrar</NavLink>
        </li>
        <li>
          <NavLink to="/register">Cadastrar</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar