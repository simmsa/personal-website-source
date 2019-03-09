import * as React from "react";

export interface SubTextProps {
  children: string;
  link?: string;
  hasSubtleLink?: boolean;
  hasSeparator?: boolean;
  isMuted?: boolean;
}

const SubText = (props: SubTextProps) => {
  const linkIsValid = props.link !== undefined && props.link.length > 0;
  const className = "h6 text-uppercase";
  const style = { letterSpacing: "1px" };

  const Content = (subProps: SubTextProps) => (
    <span className={className} style={style}>
      <small className={props.isMuted ? "text-muted" : ""}>
        {subProps.children}
      </small>
    </span>
  );

  const Next = (subProps: SubTextProps) => {
    if (linkIsValid) {
      return (
        <a
          href={subProps.link}
          className={props.hasSubtleLink || props.isMuted ? "text-dark" : ""}
        >
          <Content {...props} />
        </a>
      );
    } else {
      return <Content {...subProps} />;
    }
  };

  const Separator = (subProps: SubTextProps) => {
    if (props.hasSeparator === true) {
      return (
        <span>
          <small className="text-muted px-2">&#124;</small>
          <Next {...subProps} />
        </span>
      );
    } else {
      return <Next {...subProps} />;
    }
  };

  return (
    <div>
      <Separator {...props} />
    </div>
  );
};

export default SubText;
