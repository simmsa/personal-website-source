import * as React from "react";

interface FooterItemProps {
  text: string;
  link?: string;
  hasSeparator?: boolean;
}

const FooterItem = (props: FooterItemProps) => {
  const linkIsValid = props.link !== undefined && props.link.length > 0;
  const className = "h6 mx-3 text-uppercase";
  const style = { letterSpacing: "1px" };

  const Content = (subProps: FooterItemProps) => (
    <p className={className} style={style}>
      <small>{subProps.text}</small>
    </p>
  );

  const Next = (subProps: FooterItemProps) => {
    if (linkIsValid) {
      return (
        <a href={subProps.link}>
          <Content {...props} />
        </a>
      );
    } else {
      return <Content {...subProps} />;
    }
  };

  const Separator = (subProps: FooterItemProps) => {
    if (props.hasSeparator === true) {
      return (
        <div className="d-flex align-items-baseline">
          <small className="text-muted">&#124;</small>
          <Next {...subProps} />
        </div>
      );
    } else {
      return <Next {...subProps} />;
    }
  };

  return <Separator {...props} />;
};

const Footer = () => (
  <footer className="d-flex justify-content-center align-items-center">
    <FooterItem text={`© ${new Date().getFullYear()}`} />
    <FooterItem
      text="Email"
      link="mailto:simms.andrew@gmail.com"
      hasSeparator={true}
    />
    <FooterItem
      text="Github"
      link="https://github.com/simmsa"
      hasSeparator={true}
    />
    <FooterItem
      text="Twitter"
      link="https://twitter.com/andrewdsimms"
      hasSeparator={true}
    />
  </footer>
);

export default Footer;
