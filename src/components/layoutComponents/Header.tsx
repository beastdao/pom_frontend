import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../../App.css';
import logo from '../../images/logo_card_tb.png';
import {ConnectButton} from '../connectKit/ConnectButton';


const Header: React.FunctionComponent = () => (
  <>
    <Navbar>
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Proof of membership logo" width="auto" height="30vh" className="d-inline-block align-top"/>
          Proof Of Membership
        </Navbar.Brand>
        <ConnectButton />
      </Container>
    </Navbar>
  </>
);

export default Header;
