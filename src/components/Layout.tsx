import { graphql, StaticQuery } from "gatsby";
import * as React from "react";
import Helmet from "react-helmet";

import "./base.css";
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
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </>
    )}
  />
);

export default Layout;
