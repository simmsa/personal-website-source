import * as React from "react";

import { SubTextProps } from "./SubText";

interface OptionalMargin {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface SubTextRowProps {
  children:
    | Array<React.ReactElement<SubTextProps>>
    | React.ReactElement<SubTextProps>;
  margin?: OptionalMargin;
  justifyContent?: "start" | "end" | "center" | "between" | "around";
  isMuted?: boolean;
}

const SubTextRow = (props: SubTextRowProps) => {
  const defaultMargin: Margin = {
    bottom: 1,
    left: 0,
    right: 0,
    top: 1,
  };

  const margin: Margin = { ...defaultMargin, ...props.margin };

  // Pass `isMuted` prop down to children
  const childrenWithProps = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, { isMuted: props.isMuted });
  });

  return (
    <div
      className={`d-flex flex-row mt-${margin.top} mb-${margin.bottom} mr-${
        margin.right
      } ml-${margin.left} justify-content-${props.justifyContent || "start"}`}
    >
      {props.isMuted ? childrenWithProps : props.children}
    </div>
  );
};

export default SubTextRow;
