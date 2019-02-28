import * as React from "react";

import Image from "react-bootstrap/Image";

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.app/gatsby-image
 * - `StaticQuery`: https://gatsby.app/staticquery
 */

export interface MyImageProps {
  path: any;
  altText?: string;
  rounded?: boolean;
  circle?: boolean;
}

const MyImage = (props: MyImageProps) => (
  <Image
    src={props.path}
    alt={props.altText || ""}
    style={{ maxWidth: "200px", margin: 0, padding: 0 }}
    rounded={props.rounded}
    roundedCircle={props.circle}
  />
);
export default MyImage;
