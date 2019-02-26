import { Link } from "gatsby";
import * as React from "react";

import Image from "../components/Image";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site</p>
    <p>No go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
