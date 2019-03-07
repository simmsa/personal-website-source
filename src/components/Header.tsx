import * as React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import theme from "../theme";

interface HeaderProps {
  siteTitle: string;
}

interface HeaderTextProps {
  children: string;
}

const HeaderText = (props: HeaderTextProps) => (
  <span
    className="font-weight-light text-uppercase"
    style={{
      fontWeight: 200,
      letterSpacing: "1px",
    }}
  >
    <small>{props.children}</small>
  </span>
);

const Header = (props: HeaderProps) => (
  <header
    style={{
      background: theme.brand_color,
    }}
    className={"mb-5"}
  >
    <Navbar
      variant="dark"
      style={{
        backgroundColor: theme.brand_color,
        margin: "0 auto",
        maxWidth: "960px",
      }}
      className="d-flex"
    >
      <Navbar.Brand href="/" className="flex-grow-1">
        <HeaderText>{props.siteTitle}</HeaderText>
      </Navbar.Brand>
      <Nav>
        <Nav.Link href="/about/">
          <HeaderText>About</HeaderText>
        </Nav.Link>
        <Nav.Link href="/blog/">
          <HeaderText>Blog</HeaderText>
        </Nav.Link>
        <Nav.Link href="/projects/">
          <HeaderText>Projects</HeaderText>
        </Nav.Link>
        <Nav.Link href="/photography/">
          <HeaderText>Photography</HeaderText>
        </Nav.Link>
      </Nav>
    </Navbar>
  </header>
);

export default Header;
