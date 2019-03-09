import * as React from "react";

import { graphql, StaticQuery } from "gatsby";

import SubText from "./text/SubText";
import SubTextRow from "./text/SubTextRow";
import Title, {TitleSize} from "./text/Title";

interface BlogPostsProps {
  title?: string;
  titleSize?: TitleSize;
  showStats?: boolean;
}

const BlogPosts = (props: BlogPostsProps) => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { published: { eq: true } } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          totalCount
          edges {
            node {
              id
              frontmatter {
                date(formatString: "MMMM D, YYYY")
                title
              }
              fields {
                slug
              }
              excerpt
              timeToRead
            }
          }
        }
        site {
          siteMetadata {
            authorName
          }
        }
      }
    `}
    render={(data) => {
      const mdData = data.allMarkdownRemark;
      const posts = mdData.edges;
      const numPosts = posts.length;
      const mostRecentPostDate = posts[0].node.frontmatter.date;
      const oldestPostDate = posts[posts.length - 1].node.frontmatter.date;

      return (
        <>
          {props.title !== undefined ? (
            <div className={`${props.showStats !== true ? "mb-3" : ""}`}>
              <Title size={props.titleSize}>{props.title}</Title>
            </div>
          ) : null}
          {props.showStats === true ? (
            <SubTextRow margin={{ bottom: 3 }}>
              <SubText
                isMuted={true}
              >{`${numPosts} blog posts from ${oldestPostDate} to ${mostRecentPostDate}`}</SubText>
            </SubTextRow>
          ) : null}
          {posts.map((edge: any) => (
            <div className="mb-5">
              <Title link={edge.node.fields.slug} size={props.titleSize}>
                {edge.node.frontmatter.title}
              </Title>
              <SubTextRow margin={{ bottom: 3, top: 3 }} isMuted={true}>
                <SubText link="/about">
                  {`${data.site.siteMetadata.authorName}`}
                </SubText>
                <SubText hasSeparator={true}>
                  {edge.node.frontmatter.date}
                </SubText>
                <SubText hasSeparator={true}>
                  {`${edge.node.timeToRead} min read`}
                </SubText>
              </SubTextRow>
              <p>{edge.node.excerpt}</p>
              <SubTextRow justifyContent="end" margin={{ right: 3 }}>
                <SubText link={edge.node.fields.slug}>
                  Continue Reading...
                </SubText>
              </SubTextRow>
            </div>
          ))}
        </>
      );
    }}
  />
);

export default BlogPosts;
