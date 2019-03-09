import * as React from "react";

import BlogPosts from "../../components/BlogPosts";
import Layout from "../../components/Layout";

const Blog = () => (
  <Layout title="Blog">
    <BlogPosts title="Blog Posts" showStats={true} />
  </Layout>
);

export default Blog;
