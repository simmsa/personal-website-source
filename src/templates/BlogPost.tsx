import * as React from "react";

import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/Layout";
import SubText from "../components/text/SubText";

import "../components/sustain-syntax-highlighting.css";

// Here we specifically using what gatsby calls a "pageQuery" as opposed to a StaticQuery
// because we are searching for a specific blog post with the variable `slug`
// The why is explained here: https://www.gatsbyjs.org/docs/static-query/#how-staticquery-differs-from-page-query
// I don't like this for a few reasons:
//  1: Its not clear how `data` gets to the component (magic?)
//  2: Why is it called data? Can you change this variable name, where is it set
//  3: What variable name does this take (here we called it `query`, but it could be called anything)
//  4: If there are multiple graphql queries the first one takes precidence and sets `data`. Why?
// I think it would be better if there was a `PageQuery` component that takes variables, or just a
// `Query` component for all graphql queries
// Otherwise this is pretty cool and I like graphql
// Note: It looks like some other people would like this too... https://github.com/gatsbyjs/gatsby/issues/10482
export const query = graphql`
  query($slugString: String!) {
    markdownRemark(fields: { slug: { eq: $slugString } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        hero {
          childImageSharp {
            fluid(maxWidth: 960) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        hero_description
      }
    }
  }
`;

interface BlogPostProps {
  // Magically gets data from graphql?
  data: any;
}

const BlogPost = (props: BlogPostProps) => {
  const post = props.data.markdownRemark;
  return (
    <Layout title={post.frontmatter.title}>
      {/* Fix Weirdness with li styling */}
      <style type="text/css">
        {`
          li p {
            margin-bottom: 0.25em;
            padding-bottom: 0;
          }
          ol, ul {
            margin-bottom: 1em;
          }

          ol ul {
            margin-bottom: 1em;
          }
        `}
      </style>
      <h1 className="display-4">{post.frontmatter.title}</h1>
      <p>
        <small className="text-uppercase" style={{ letterSpacing: "1px" }}>
          {post.frontmatter.date}
        </small>
      </p>
      <Img fluid={post.frontmatter.hero.childImageSharp.fluid} />
      {post.frontmatter.hero_description !== "" ? (
        <div className="d-flex align-items-center justify-content-center mb-3 mt-1">
          <SubText isMuted={true}>{post.frontmatter.hero_description}</SubText>
        </div>
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  );
};

export default BlogPost;
