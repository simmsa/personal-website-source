import * as React from "react";

/**
 * Uses html header size - smaller numbers yield bigger text
 */
export type TitleSize = 1 | 2 | 3 | 4 | 5;

interface TitleProps {
  children: string;
  link?: string;
  size?: TitleSize;
}

const Title = (props: TitleProps) => (
  <>
    <h1
      className={`font-weight-light text-dark ${
        props.size ? "h" + props.size : ""
      }`}
    >
      {props.link !== undefined ? (
        <a href={props.link} className="text-dark text-decoration-none">
          {props.children}
        </a>
      ) : (
        props.children
      )}
    </h1>
  </>
);

export default Title;
