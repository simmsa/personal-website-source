import { graphql, StaticQuery } from "gatsby";
import * as React from "react";

import "../../lib/bootstrap/bootstrap.css";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import Footer from "./Footer";
import Header from "./Header";
import SEO from "./Seo";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout = (props: LayoutProps) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <SEO title={props.title || data.site.siteMetadata.title} />
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{props.children}</main>
          <Footer />
        </div>
      </>
    )}
  />
);

export default Layout;
