import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Check if the current path is workouts
  const isWorkoutPage = currentPath === '/workouts';

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="flexup-nav">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/" className="me-5">
          <img
            src="https://bing.com/th/id/BCO.8951d92b-e28d-40fa-8139-dbe0608c88ec.png"
            alt="logo"
            className="flexup-logo me-2"
            style={{ maxWidth: "70px", maxHeight: "70px" }}
          />
          Flex Up
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {/* Left Side Nav Links */}
          <Nav className="me-auto custom-nav">
            {isWorkoutPage ? (
              <>
                <Nav.Link href="/dashboard" className={currentPath === '/dashboard' ? 'active' : ''}>Dashboard</Nav.Link>
                <Nav.Link href="/workouts" className={currentPath === '/workouts' ? 'active' : ''}>Workouts</Nav.Link>
                <Nav.Link href="/progress" className={currentPath === '/progress' ? 'active' : ''}>Progress</Nav.Link>
                <Nav.Link href="/profile" className={currentPath === '/profile' ? 'active' : ''}>Profile</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/" className={currentPath === '/' ? 'active' : ''}>Home</Nav.Link>
                <Nav.Link href="/about" className={currentPath === '/about' ? 'active' : ''}>About</Nav.Link>
                <Nav.Link href="/dashboard" className={currentPath === '/dashboard' ? 'active' : ''}>Dashboard</Nav.Link>
                <Nav.Link href="/profile" className={currentPath === '/profile' ? 'active' : ''}>Profile</Nav.Link>

                <NavDropdown title="More" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/contact">Contact</NavDropdown.Item>
                  <NavDropdown.Item href="#blog">Services</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#faq">FAQ</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>

          {/* Right Side */}
          <Nav className="ms-auto custom-nav">

            

            {/* Hide login/signup on /workouts and /dashboard */}
            {!(currentPath === '/workouts' || currentPath === '/dashboard') && (
              <>
                <Nav.Link href="#login" className="me-2">Login</Nav.Link>
                <Nav.Link href="#signup" className="btn me-2">Sign Up</Nav.Link>
              </>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
