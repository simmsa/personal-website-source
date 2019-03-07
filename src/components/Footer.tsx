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

interface FooterRowProps {
  children: React.ReactNode;
  marginTop?: number;
}

const FooterRow = (props: FooterRowProps) => (
  <div
    className={`d-flex justify-content-center align-items-center mt-${props.marginTop ||
      1}`}
  >
    {props.children}
  </div>
);

const Footer = () => (
  <footer className="mt-5">
    <FooterRow>
      <FooterItem text={`© ${new Date().getFullYear()} Andrew Simms`} />
    </FooterRow>
    <FooterRow>
      <FooterItem text="Email" link="mailto:simms.andrew@gmail.com" />
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
    </FooterRow>
    <FooterRow>
      <FooterItem text={"Built With Gatsby"} link="https://www.gatsbyjs.org/" />
    </FooterRow>
  </footer>
);

export default Footer;
