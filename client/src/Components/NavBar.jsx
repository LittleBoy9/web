import React, { useContext } from 'react'
import { Navbar,Container,Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

import { userContext } from '../App';

export default function NavBar() {
  const {state, dispatch} = useContext(userContext);

  const RenderMenu = () => {
    if(state == true){
      return(
        <>
          <NavLink to="/" className="nav-link">Home</NavLink>           
          <NavLink to="/contact" className="nav-link">Contact</NavLink>          
          <NavLink to="/profile" className="nav-link">Profile</NavLink>
          <NavLink to="/logout" className="nav-link">LogOut</NavLink>
        </>
      )
    }
    else {
      return(
        <>
          <NavLink to="/" className="nav-link">Home</NavLink>           
          <NavLink to="/contact" className="nav-link">Contact</NavLink>          
          <NavLink to="/profile" className="nav-link">Profile</NavLink>    
          <NavLink to="/login" className="nav-link">Login</NavLink>     
          <NavLink to="/registration" className="nav-link">Registration</NavLink>
        </>
      )
    }
  }
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand><NavLink to="/" className="navbar-brand">
            <span className="m">M</span>
            <span className="e">E</span>
            <span className="r">R</span>
            <span className="n">N</span> Stack</NavLink></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <RenderMenu />
              {/* <NavLink to="/" className="nav-link">Home</NavLink>           
              <NavLink to="/contact" className="nav-link">Contact</NavLink>          
              <NavLink to="/profile" className="nav-link">Profile</NavLink>    
              <NavLink to="/login" className="nav-link">Login</NavLink>     
              <NavLink to="/registration" className="nav-link">Registration</NavLink> 
              <NavLink to="/logout" className="nav-link">LogOut</NavLink> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
