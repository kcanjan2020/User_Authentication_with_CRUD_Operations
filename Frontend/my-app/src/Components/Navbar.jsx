import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
const NavbarComponent = () => {
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="http://localhost:3000/">User Authentication System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="me-auto">


                            <Nav.Link href="http://localhost:3000/admin/register">Sign Up</Nav.Link>

                            <Nav.Link href="http://localhost:3000/admin/login">Login</Nav.Link>

                            <Nav.Link href="http://localhost:3000/admin/profile"> Profile</Nav.Link>

                            <Nav.Link href="http://localhost:3000/admin/read-alluser">Read All User</Nav.Link>

                            <Nav.Link href="http://localhost:3000/admin/logout">Logout</Nav.Link>


                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavDropdown.Item href="http://localhost:3000/admin/update-password">Change Password</NavDropdown.Item>
                                <NavDropdown.Item href="http://localhost:3000/admin/forgot-password">
                                    Forgot Password
                                </NavDropdown.Item>
                                <NavDropdown.Item href="http://localhost:3000/admin/update-profile">Update Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComponent