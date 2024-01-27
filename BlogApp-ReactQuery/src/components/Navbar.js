import React from "react";
import { useUserDispatch, useUserValue } from "../contexts";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

const AppNavbar = () => {
  const user = useUserValue();
  const dispatchUser = useUserDispatch();

  const handleLogout = () => {
    dispatchUser({ type: "remove" });
  };

  return (
    <>
      {user && 
        <>
          <Navbar expand="lg" bg="light">
            <Navbar.Brand className="ps-3">Blog App</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav' className='ps-3 ps-lg-0'>
              <Nav className="w-100 me-auto">
                  <Nav.Link href="#" as="span">
                    <Link to='/' className="mr-1">Blogs</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link to='/users'>Users</Link>
                  </Nav.Link>
             </Nav>
             <Nav>
                <strong className="me-3">Logged in as {user.name}</strong>
                <Nav.Link>
                  <Button variant="secondary" onClick={handleLogout}>Logout</Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </>
      }
    </>
  )
}

export default AppNavbar;