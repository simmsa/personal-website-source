import * as React from "react";

import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import BlogPosts from "../components/BlogPosts";
import Layout from "../components/Layout";

import Portrait from "../images/Andrew-Simms.jpg";

const IndexPage = () => (
  <Layout>
    <h1 className="text-center">Hello, I'm Andrew.</h1>
    <Container className="my-4">
      <Image
        src={Portrait}
        roundedCircle={true}
        className="mx-auto d-block"
        style={{ maxWidth: "250px" }}
      />
    </Container>
    <p className="h3 mb-3">
      I am a programmer, photographer, guitar player, and maker currently living
      in Golden, Colorado.
    </p>
    <h3 className="pt-1 mt-5 mb-4">Newest Blog Posts</h3>
    <BlogPosts titleSize={4} />
  </Layout>
);

export default IndexPage;
