import * as React from "react";

import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import theme from "../theme";

interface HeaderProps {
  siteTitle: string;
}

interface HeaderTextProps {
  children: string;
  isUppercase?: boolean;
}

const HeaderText = (props: HeaderTextProps) => (
  <span
    className={`${props.isUppercase === false ? "" : "text-uppercase"} small`}
    style={{
      letterSpacing: props.isUppercase === false ? "0px" : "1px",
    }}
  >
    {props.children}
  </span>
);

const Header = (props: HeaderProps) => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "images/Andrew-Simms.jpg" }) {
          childImageSharp {
            fixed(width: 30, height: 30) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={(data) => (
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
          expand="sm"
        >
          <Navbar.Brand
            href="/"
            className="d-flex flex-grow-1 align-items-center"
          >
            <Img
              fixed={data.file.childImageSharp.fixed}
              className="rounded-circle mr-3 d-none d-md-block"
              alt="Andrew Simms"
            />
            <HeaderText isUppercase={false}>{props.siteTitle}</HeaderText>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse bsPrefix="navbar-collapse d-flex justify-content-end">
            <Nav>
              <Nav.Link href="/about/" className="d-flex align-items-center">
                <HeaderText>About</HeaderText>
              </Nav.Link>
              <Nav.Link href="/blog/" className="d-flex align-items-center">
                <HeaderText>Blog</HeaderText>
              </Nav.Link>
              <Nav.Link href="/projects/" className="d-flex align-items-center">
                <HeaderText>Projects</HeaderText>
              </Nav.Link>
              <Nav.Link
                href="/photography/"
                className="d-flex align-items-center"
              >
                <HeaderText>Photography</HeaderText>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    )}
  />
);

export default Header;
