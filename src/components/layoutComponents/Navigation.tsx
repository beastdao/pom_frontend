import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import '../../App.css';
import Alert from 'react-bootstrap/Alert';

const Navigation: React.FunctionComponent<{pages: string[]}> = ({ pages }) => (
  <Nav defaultActiveKey="/" className="flex-column navigation">
    {pages.map((page, index) => (
      <Nav.Item key={index}>
      <Nav.Link
        as={Link}
        to={page === 'Home' ? '/' : `/${page === '🌈 Create Community' ? 'createcommunity' : page.replace(/\s+/g, '').toLowerCase()}`}
        eventKey={`/${page.replace(/\s+/g, '').toLowerCase()}`}
      >
          {page}
        </Nav.Link>
      </Nav.Item>
    ))}
    <>
      {[
        'danger',
      ].map((variant) => (
        <Alert className="bottom" key={variant} variant={variant}>
          <b>Attention!</b> We are now at the early Alpha test stage, protocol may be updated any time leading to old data unavailability. <br /> <a href="https://forms.gle/qAsZ74NM5GZjpRc88" target="_blank"><b>Join our waitlist</b></a>
        </Alert>
      ))}
    </>
  </Nav>
);

export default Navigation;
