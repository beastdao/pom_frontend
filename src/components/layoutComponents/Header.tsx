import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../../images/logo_card_tb.png";
import { ConnectButton } from "../connectKit/ConnectButton";
import { Link } from "react-router-dom";

const Header: React.FunctionComponent<{ pages: string[] }> = ({ pages }) => (
  <>
    <Navbar expand="lg"  className="bg-body-tertiary" collapseOnSelect= {true}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Proof of membership logo"
            width="auto"
            height="30vh"
            className="d-inline-block align-top"
          />
          Proof Of Membership
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav defaultActiveKey="/">
            {pages.map((page, index) => (
              <Nav.Item key={index}>
                <Nav.Link
                  as={Link}
                  to={
                    page === "🌈 CREATE COMMUNITY"
                      ? "/createcommunity"
                      : page.replace(/\s+/g, "").toLowerCase()
                  }
                  eventKey={`/${page.replace(/\s+/g, "").toLowerCase()}`}
                >
                  {page}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <ConnectButton />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
);

export default Header;
