import * as React from "react"
import * as CSS from "csstype"

const baseFontSize = 16
const smallFontSize = baseFontSize * 0.7
const textColor = "#000"
const dividerColor = "rgba(0, 0, 0, 0.1)"
const pageWidth = "960px"
const fontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'

type ContainerProps = {
  children?: React.ReactNode
}

const Container = (props: ContainerProps) => {
  return (
    <div
      style={{
        width: pageWidth,
        margin: "0 auto",
        padding: "10px",
      }}
    >
      {props.children}
    </div>
  )
}

type SectionProps = {
  children?: React.ReactNode
  isRow?: boolean
  backgroundColor?: string
}

const Section = (props: SectionProps) => {
  return (
    <div
      style={{
        display: "flex",
        width: pageWidth,
        flexDirection: props.isRow === true ? "row" : "column",
        justifyContent: "space-between",
        marginBottom: `${baseFontSize * 0.5}px`,
        backgroundColor:
          props.backgroundColor !== undefined ? props.backgroundColor : "#fff",
      }}
    >
      {props.children}
    </div>
  )
}

type TitleProps = {
  size?: number
  children?: React.ReactNode
}

const Title = (props: TitleProps) => {
  return (
    <h1
      style={{
        fontSize: `${props.size ? props.size : baseFontSize * 2}px`,
        color: textColor,
        fontFamily,
      }}
    >
      {props.children}
    </h1>
  )
}

type SectionTitleProps = {
  size?: number
  children?: React.ReactNode
  hasUnderline?: boolean
}

const SectionTitle = (props: SectionTitleProps) => {
  return (
    <h3
      style={{
        fontSize: `${props.size ? props.size : baseFontSize * 1.5}px`,
        borderBottom:
          props.hasUnderline === true ? `0.5px solid ${dividerColor}` : "none",
        paddingBottom: props.hasUnderline === true ? `3px` : "none",
        width: props.hasUnderline === true ? pageWidth : "none",
        fontFamily,
        color: textColor,
      }}
    >
      {props.children}
    </h3>
  )
}

type TextProps = {
  size?: number
  children?: React.ReactNode
  hasUnderline?: boolean
  isBold?: boolean
  isItalic?: boolean
  isAllUpper?: boolean
  link?: string
}

const Text = (props: TextProps) => {
  const styleProps: CSS.Properties = {
    fontSize: `${props.size !== undefined ? props.size : baseFontSize * 1}px`,
    fontWeight: props.isBold === true ? "bold" : "normal",
    fontStyle: props.isItalic === true ? "italic" : "normal",
    fontFamily,
    textTransform: props.isAllUpper === true ? "uppercase" : "none",
    letterSpacing: props.isAllUpper === true ? "0.5px" : "0px",
    borderBottom: props.link !== undefined ? "1px solid #ccc" : "none",
    color: textColor,
    display: "inline",
  }
  return (
    <>
      {props.link !== undefined ? (
        <a href={props.link}>
          <p style={styleProps}>{props.children}</p>
        </a>
      ) : (
        <p style={styleProps}>{props.children}</p>
      )}
    </>
  )
}

type EntryProps = {
  title?: string
  extraTitle?: string
  company?: string
  startDate?: string
  endDate?: string
  link?: string
  location?: string
  points: Array<string | string[] | React.ReactElement>
}

const Entry = (props: EntryProps) => {
  const hasDate = props.startDate !== undefined && props.endDate !== undefined
  return (
    <Section>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        {hasDate ? (
          <div
            style={{
              flexBasis: "80px",
              flexGrow: 0,
              flexShrink: 0,
              marginRight: `${smallFontSize}px`,
              marginBottom: `${smallFontSize}px`,
              borderRight: `0.5px solid ${dividerColor}`,
            }}
          >
            <Text isBold={true} size={smallFontSize} isAllUpper={true}>
              {props.startDate}
              -
              <br />
              {props.endDate}
            </Text>
          </div>
        ) : null}
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingBottom: "0px",
              marginBottom: "0px",
              alignItems: "center",
              justifyContent: "space-between",
              width: `${hasDate ? 960 - 90 : 960}px`,
              borderLeft: "none",
            }}
          >
            {props.title !== undefined ? (
              props.link !== undefined ? (
                <div>
                  <a href={props.link}>
                    <Text isBold={true}>{props.title}</Text>
                  </a>
                </div>
              ) : (
                <div>
                  <Text isBold={true}>{props.title}</Text>
                </div>
              )
            ) : null}
            {props.extraTitle !== undefined ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  flexGrow: 2,
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    flexGrow: 2,
                    backgroundColor: "#fff",
                    borderBottom: `0.5px solid ${dividerColor}`,
                    height: "1px",
                    marginLeft: `${baseFontSize}px`,
                    marginRight: `${baseFontSize}px`,
                  }}
                ></div>
                <div style={{ top: "-3px", position: "relative" }}>
                  <Text isAllUpper={true} size={smallFontSize}>
                    {props.extraTitle}
                  </Text>
                </div>
              </div>
            ) : null}
          </div>
          {props.company !== undefined ? (
            <div>
              <Text isAllUpper={true} size={smallFontSize}>
                {props.company}
              </Text>
              {props.location !== undefined ? (
                <Text isAllUpper={true} size={smallFontSize}>
                  {` - ${props.location}`}
                </Text>
              ) : null}
            </div>
          ) : null}
          <ul style={{ margin: 0 }}>
            {props.points.map(
              (point: string | string[] | React.ReactElement, i: number) => {
                if (Array.isArray(point)) {
                  return (
                    <ul key={point[0]}>
                      {point.map((p) => {
                        return (
                          <li key={p}>
                            <Text>{p}.</Text>
                          </li>
                        )
                      })}
                    </ul>
                  )
                } else {
                  if (typeof point === "string") {
                    return (
                      <li key={point}>
                        <Text>{point}.</Text>
                      </li>
                    )
                  } else {
                    return <div key={i}>{point}</div>
                  }
                }
              }
            )}
          </ul>
        </div>
      </div>
    </Section>
  )
}

const today = new Date()

const CoverLetter = () => (
  <Container>
    <Section isRow={true}>
      <div>
        <Title>Andrew Simms</Title>
        <Text isAllUpper={true} size={smallFontSize}>
          Applicant For: Water and Offshore Wind Data Acquisition and
          Instrumentation Engineer - R7595
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <div>
          <Text>andrew.simms@nrel.gov</Text>
        </div>
        <div>
          <Text>(720) 537-6446</Text>
        </div>
        <div>
          <Text>Golden, CO</Text>
        </div>
      </div>
    </Section>
    <div style={{ height: `${baseFontSize}px` }}></div>
    <Section>
      <Text isAllUpper={true} size={smallFontSize}>
        {today.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        <br />
        <br />
        Ms. Elise DeGeorge - Manager - Water Power
        <br />
        National Renewable Energy Laboratory
        <br />
        15301 W. Denver West Pkwy
        <br />
        Golden, CO 80401
      </Text>
    </Section>
    <Section>
      <Text>
        Dear Ms. DeGeorge,
        <br />
        {/* What about this position is interesting and why do you want this position */}
        <br />I am excited to be applying for your Water and Offshore Wind Data
        Acquisition and Instrumentation Engineer (R7595) position! I have found
        my 2+ years at NREL to be exciting and incredibly satisfying. I enjoy
        coming into work everyday and working collaboratively towards the
        mission of saving the planet. Part of my personality gravitates towards
        doing something that truly matters, and in applying for this new
        position I am hopeful that NREL and the Water Power group will take full
        advantage of the skills, experience, and passion I have to offer, while
        also providing a career that makes the world a better place.
        <br />
        <br />
        {/* What have you done that matches the job description, and how did you excel at those things? */}
        In my current hands-on position as a research electronics technician I
        build and deploy professional quality custom data acquisition systems
        (DAS) and instrumentation for cutting-edge marine renewable energy (MRE)
        research. I am a team member of two currently deployed projects, the
        MODAQ system on-board the C-Power SeaRAY and strain gages installed
        inside of the Verdant Power Thermoplastic Blades. This experience gives
        me a deep understanding of the big picture of planning, building,
        deploying and documenting DAS solutions for the MRE industry, and an
        appreciation of the challenge of data acquisition in a marine
        environment.
        <br />
        <br />
        In my past positions as a mobile, web, and firmware developer I built
        small to medium sized custom applications for small businesses and
        startups. I learned to be adaptable, methodical, curious, and tenacious.
        My experiences ranges from writing near real-time Haversine distance
        ranking algorithms in TypeScript to optimizing Bezier curve calculation
        algorithms in C. I have programmed on multiple platforms and
        technologies including HTML/CSS, PHP/SQL/Wordpress, Python/Django,
        C/Arduino, JavaScript/Node.js, React Native and Typescript/React.js.I am
        familiar with many different software development tools including Git,
        Github, Linux, and Vim. This experience gives me a head start on the
        programming challenges I would face in this position and I am hopeful
        that my skills will be useful programming LabVIEW, SoC hardware and FPGA
        devices.
        <br />
        <br />I also enjoy programming as a hobby and in my free time developed
        and built a Raspberry Pi (RPi) based{" "}
        <Text link="https://github.com/simmsa/home_das">Home DAS</Text> which
        uses Python code to monitor and collect on-demand 240 Hz amperage data
        which is visualized with a web server written in Next.js and Typescript
        for monitoring and collecting water usage data of a dosing pump system.
        More examples of my software work can be found on my{" "}
        <Text link="http://github.com/simmsa">personal</Text> and{" "}
        <Text link="http://nrel.github.gov/asimms">NREL</Text> Github accounts.
        <br />
        <br />
        During my time at the University of Colorado Boulder - Leeds School of
        Business I earned a B.S. in Business Administration with an emphasis in
        Finance. With classes ranging from Entrepreneurial Finance to Capital
        Investment Analysis, I gained a strong understanding of quantitative
        finance and statistics. My Capstone project calculating the corporate
        valuation and future price estimation of Google stock was a great
        exercise in building models to evaluate the future value of current
        assets. After 5 years our estimated price differed from the market value
        by only 13%!
        <br />
        <br />
        In a lot of ways, this is the perfect job for me. I get to leverage my
        skills and knowledge gained as a research electronics technician and
        blend them with with my software development experience and my B.S
        business/finance degree. My experience has taught me the time and effort
        required to do quality work, and I will use this experience to plan,
        develop, document, and deploy the next generation of data acquisition
        systems for MRE and beyond.
        {/* Why I would fit in at NREL */}
        <br />
        <br />I look forward to discussing this Data Acquisition and
        Instrumentation Engineer position and my qualifications in more detail.
        I am available to talk at your earliest convenience. Thank you for your
        time and consideration.
        <br />
        <br />
        Sincerely,
        <br />
        Andrew Simms
        <br />
        <Text link="mailto:andrew.simms@nrel.gov">andrew.simms@nrel.gov</Text>
      </Text>
    </Section>
  </Container>
)

export default CoverLetter
// In reference to your responsibilities and requirements listed in the job
// description, I have:
// <br />
// <ul>
//   <li>
//     A passion for improving the world through renewable energy
//     development
//   </li>
//   <li>Multiple years of experience as a software developer</li>
//   <li>A curious mind</li>
// </ul>
// <br />I am excited to be appying for the Engineer position at NREL. I
// have been building and programming electronics devices since middle
// school and programming since college, so it has always been a passion of
// mine. I love the idea that I could turn something I enjoy into a full
// time career while also doing my part to save the planet.
// <br />
// <br />
// In my current role as a research technician I routinely build and deploy
// professional grade data acquisition systems (DAS) and have experience in
// sucessfully spec'ing, building, and deploying research grade DAS.
// <br />
// <br />
// In my previous positions I build
// <br />
// <br />
// There is no question I have a lot to learn, but my current and past
// experience puts me in a unique position. My software skills are much
// different and allow me to contribute in areas where other team members
// cannot. Essentially, I can, and will do the grunt work to let senior
// engineers focus on solving higher level problems.
// <br />
// <br />
// Please feel free to check out my{" "}
// <Text link="http://github.com/simmsa">personal</Text> and{" "}
// <Text link="http://nrel.github.gov/asimms">NREL</Text> github accounts
// to see examples of my software work.
// <br />
// <br />
// My blend of hands-on technical skill, software development experience,
// financial and statistical understanding, and business degree, would
// allow me to contribute in multiple domains useful to NREL, DOE and the
// MRE industry.
