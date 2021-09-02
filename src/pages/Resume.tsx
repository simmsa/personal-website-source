import * as React from "react"

import * as CSS from "csstype"

import "../components/resume_print.css"

const baseFontSize = 16
const smallFontSize = baseFontSize * 0.7
const textColor = "#000"
const dividerColor = "rgba(0, 0, 0, 0.1)"
const pageWidth = "1000px"
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
      className="section"
      style={{
        display: "flex",
        position: "relative",
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
    borderBottom:
      props.link !== undefined || props.hasUnderline == true
        ? "1px solid #ccc"
        : "none",
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
        className="entry"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          position: "relative",
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
                  <a href={props.link} target="_blank">
                    <Text isBold={true} hasUnderline={true}>
                      {props.title}
                    </Text>
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

const Resume = () => (
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
    <Section>
      <Text>
        Passionate, safety minded, research electronics technician with previous
        experience in software development, is seeking a challenging and
        interesting career working to push the marine renewable energy (MRE)
        industry forward by focusing on high quality data acquisition and
        instrumentation for building, validation, and improvement of modeling
        tools at NREL and in industry.
      </Text>
    </Section>
    <Section>
      <SectionTitle hasUnderline={true}>Experience</SectionTitle>
      <Entry
        title="MRE Research Electronics Technician"
        company="National Renewable Energy Laboratory"
        location="Arvada, CO"
        extraTitle="Industrial Controls, Data Acquisition, Instrumentation"
        startDate="Oct 2020"
        endDate="Present"
        points={[
          <li>
            <Text isBold={true}>MRE Instrumentation Seedling</Text>
            <Text isAllUpper={true} size={smallFontSize}>
              {" "}
              - Robynne Murray, Ryan Beach, Aidan Bharath
            </Text>
            <br />
          </li>,
          <ul>
            <li>
              <Text>
                Lead technician for $100K seedling project focused on optimizing
                the selection, installation, and pre-deployment validation of
                loads measurement instrumentation, specifically foil strain
                gages, to improve reliability and cost effectiveness of offshore
                and submarine data acquisition campaigns.
              </Text>
            </li>
            <li>
              <Text>
                Researched, specified, installed, and documented multiple
                experimental "waterproof" protective coating products for strain
                gages in an effort to quantify estimated lifespan and cost of
                installation when used in marine deployments.
              </Text>
            </li>
            <li>
              <Text>
                Performed on-going analysis of strain gage TDMS data files to
                verify nominal performance and to visualize and characterize
                failed data streams of saturated strain gages.
              </Text>
            </li>
          </ul>,
          <li>
            <Text
              link="https://www.nrel.gov/news/program/2021/searay-preps-for-hawaii.html"
              isBold={true}
            >
              C·Power SeaRAY MODAQ Hardware
            </Text>
            <Text isAllUpper={true} size={smallFontSize}>
              {" "}
              - Rebecca Fao, Rob Raye, Mark Murphy, Casey Nichols
            </Text>
            <br />
          </li>,
          <ul>
            <li>
              <Text>
                Built and validated the 2 complex enclosures for a custom data
                acquisition and controls system used to monitor and control the
                SeaRAY autonomous offshore power system (AOPS), including
                integration of current, voltage, temperature, motion, water
                level sensors, and cellular communications equipment.
              </Text>
            </li>
            <li>
              <Text>
                Collaborated with C·Power to spec, integrate, build, and
                troubleshoot cost-effective custom built marine grade
                electronics connectors.
              </Text>
            </li>
            <li>
              <Text>
                Designed and built power bus circuit to facilitate reliable data
                system operation with minimal hands on intervention.
              </Text>
            </li>
          </ul>,
          <li>
            <Text
              link="https://www.nrel.gov/news/program/2021/tidal-power-turbine-blade-new-york.html"
              isBold={true}
            >
              Verdant Power NDAQ: Tidal Turbine Hub Data Acquisition System
              (DAS)
            </Text>
            <br />
            <Text isAllUpper={true} size={smallFontSize}>
              Robynne Murray, Aidan Bharath, Andy Scholbrock, Mark Murphy
            </Text>
            <br />
          </li>,
          <ul>
            <li>
              <Text>NREL "Team of the Month" for April 2021</Text>
            </li>
            <li>
              <Text>
                Prepped, documented, installed and verified operation of 10
                submarine battery cables and Subconn submarine electrical
                connectors designed to power submarine DAS for 6 months.
              </Text>
            </li>
            <li>
              <Text>
                Supported installation, documentation, and quality control (QC)
                of custom DAS sealed in a pressure canister.
              </Text>
            </li>
            <li>
              <Text>
                Spliced, potted, terminated, and documented strain gage cable
                runs from turbine blades to DAS.
              </Text>
            </li>
          </ul>,
          <li>
            <Text
              link="https://www.nrel.gov/news/program/2021/tidal-power-turbine-blade-new-york.html"
              isBold={true}
            >
              Verdant Power: Thermoplastic Blade Loads Measurement
              Instrumentation
            </Text>
            <br />
            <Text isAllUpper={true} size={smallFontSize}>
              Robynne Murray, Ryan Beach, Simon Thao
            </Text>
            <br />
          </li>,
          <ul>
            <li>
              <Text>
                Lead technician for the preparation, installation, and
                validation of 178 strain gages over multiple months on 4
                experimental thermoplastic tidal turbine blades for laboratory
                and field validation of loads models.
              </Text>
            </li>
            <li>
              <Text>
                Worked with engineers to refine techniques for strain gage
                installation in marine environments.
              </Text>
            </li>
            <li>
              <Text>
                Performed thorough QC checks throughout the installation
                process, to find and eliminate installation deficiencies in near
                real-time.
              </Text>
            </li>
          </ul>,
        ]}
      />
      <Entry
        title="Wind Energy Research Electronics Technician"
        company="National Renewable Energy Laboratory"
        location="Arvada, CO"
        extraTitle="Data Acquisition, Field Deployment, Documentation"
        startDate="June 2019"
        endDate="Sept 2020"
        points={[
          <li>
            <Text
              link="https://www.nrel.gov/docs/fy21osti/79664.pdf"
              isBold={true}
            >
              DOE 1.5 Aeroacoustics Assessment
            </Text>
            <Text isAllUpper={true} size={smallFontSize}>
              {" "}
              - Nicholas Hamilton, David Jager
            </Text>
            <br />
          </li>,
          <ul>
            <li>
              <Text>
                Successfully built and installed 3 outdoor rated cRIO based data
                acquisition systems including ~1500 ft of fiber and power cables
                for wind turbine acoustic measurements in the audible and
                infrasonic frequency ranges in compliance with IEC 61400-11.
              </Text>
            </li>
            <li>
              <Text>Developed </Text>
              <Text link="https://github.nrel.gov/pages/asimms/DOE-1.5-Aeroacoustics-Assessment-Field-Equipment-Map">
                layered microphone location map
              </Text>
              <Text>
                {" "}
                with React.js and Mapbox to provide validation of microphone
                placement against modeled locations and verify coordinates fell
                with IEC 61400-11 measurement area.
              </Text>
            </li>
            <li>
              <Text>
                Provided setup and support for on demand microphone deployment,
                calibration, and takedown
              </Text>
            </li>
            <li>
              <Text>
                Documented and digitized all calibrated equipment datasheets in
                accordance with IEC, A2LA, and NREL standards. Used datasheets
                to create slope and offset values for initial microphone
                calibrations.
              </Text>
            </li>
          </ul>,
          <li>
            <Text
              link="https://www.nrel.gov/docs/fy20osti/75789.pdf"
              isBold={true}
            >
              AWAKEN - Lidar Setup and Troubleshooting
            </Text>
            <Text isAllUpper={true} size={smallFontSize}>
              {" "}
              - Mithu Debnath, Andy Scholbrock
            </Text>
            <br />
          </li>,
          <ul>
            <li>
              <Text>
                Lead technician for deployment and support of 2 scanning Galion
                lidars and 1 profiling Vaisala Wind Cube lidar for complex flow
                model validation with against data from the Site 4.0 M5 met
                tower.
              </Text>
            </li>
            <li>
              <Text>Developed </Text>
              <Text link="https://github.nrel.gov/pages/asimms/2020-Galion-Lidar">
                Lidar location map
              </Text>
              <Text>
                {" "}
                with React.js and Mapbox to facilitate optimal placement of
                equipment.
              </Text>
            </li>
          </ul>,
          <li>
            <Text
              link="https://www.nrel.gov/docs/fy21osti/79664.pdf"
              isBold={true}
            >
              NextEra Peetz Wind Farm Loads Measurement Campaign
            </Text>
            <Text isAllUpper={true} size={smallFontSize}>
              {" "}
              - Heidi Tinnesand, Jason Roadman, Jerry Hur
            </Text>
            <br />
          </li>,
          <ul>
            <li>
              <Text>
                Successfully built to spec 8 custom Ethercat based NI DAS
                enclosures, companion MIL-DTL-26482 connectors, and two custom
                rackmount computer systems, deployed into 2 NextEra turbines in
                Sterling, CO
              </Text>
            </li>
            <li>
              <Text>
                Successfully installed and validated 2 turbine data systems with
                tower and nacelle instrumentation during 2 week deployment in
                August 2019
              </Text>
            </li>
          </ul>,
          <br />,
          <br />,
          <br />,
          <br />,
          <br />,
          <li>
            <Text isBold={true}>
              Flatirons Campus Research Equipment Inspections
            </Text>
            <Text isAllUpper={true} size={smallFontSize}>
              {" "}
              - Scott Wilde, Emily Kotz, Simon Thao
            </Text>
            <br />
          </li>,
          <ul>
            <li>
              <Text>
                Performed and digitized weekly vehicle & heavy equipment
                inspections.
              </Text>
            </li>
            <li>
              <Text>
                Managed and digitized diesel AST fuel logs and ordered fuel as
                needed. Worked to estimate lifespan on on-site vehicles based on
                monthly usage statistics.
              </Text>
            </li>
            <li>
              <Text>
                Wrote Python script to automate the digitization past fuel and
                vehicle logs to comply with 5 year DOE record keeping
                obligations.
              </Text>
            </li>
          </ul>,
        ]}
      />
      <Entry
        title="Mobile Full Stack App Developer"
        company="BuzzOtter"
        location="Denver, CO"
        extraTitle="React Native, Firebase, iOS, Android, JavaScript, TypeScript"
        link="http://www.buzzotter.com"
        startDate="Dec 2018"
        endDate="Sept 2016"
        points={[
          <Text>
            Startup in the mobile payment space, building an app to "buy a
            friend a beer from anywhere".
          </Text>,
          <li>
            <Text link="http://www.buzzotter.com" isBold={true}>
              BuzzOtter iOS and Android App:
            </Text>
            <br />
          </li>,
          <ul>
            <li>
              <Text>
                Lead developer of ~20K LOC, ~100 user cross-platform mobile
                application built with React Native & TypeScript.
              </Text>
            </li>
            <li>
              <Text>
                Designed and developed component based React UI with redux-saga
                async state management, native screen routing, maps integration.
              </Text>
            </li>
            <li>
              <Text>
                Used redux and redux-saga to asynchronusly handle and update app
                state on demand based on user or server actions via screen based
                reducer functions.
              </Text>
            </li>
            <li>
              <Text>
                Designed and developed location based payment verification
                algorithm using real-time Haversine distance calculations
                between customer and waitstaff mobile devices, eliminating the
                need for complex integration with typical POS systems.
              </Text>
            </li>
            <li>
              <Text>
                Designed and implemented custom UI component library from
                Balsamiq templates for immersive brand experience, complete with
                logo and mascot animations where applicable and desired.
              </Text>
            </li>
            <li>
              <Text>
                Built and managed frontend to backend integration with redux and
                redux saga async actions, providing a fast and interactive
                customer experience.
              </Text>
            </li>
            <li>
              <Text>
                Followed best practices for Test Driven Development (TDD) using
                Enzyme/Jest for React Native code, and Espresso and XCTest for
                Android & iOS UI testing respectively.
              </Text>
            </li>
          </ul>,
          <li>
            <Text isBold={true}>Firebase Google Cloud Platform Backend:</Text>
            <br />
          </li>,
          <ul>
            <li>
              <Text>
                Support developer for ~10K LOC backend for mobile app, built
                with TypeScript on top of Google Firebase.
              </Text>
            </li>
            <li>
              <Text>
                Integrated Stripe backend credit card API for a fast, secure,
                and compliant token based payment system, complete with credit
                card CRUD ability from app to server.
              </Text>
            </li>
            <li>
              <Text>
                Developed shared NoSQL database schema types for syncing
                database schema keys between app and server codebases
              </Text>
            </li>
          </ul>,
        ]}
      />
      <Entry
        title="Firmware Developer & Hardware Integration"
        company="Slidelapse"
        location="Golden, CO"
        extraTitle="C, Microcontrollers, Stepper Motors, Operating Systems"
        startDate="Sept 2016"
        endDate="June 2014"
        points={[
          "Designed and built the hardware and software control system for a microcontroller based timelapse slider controlled by a precision stepper motor and control a DSLR camera via user customized settings",
          "Assembled custom Arduino based controller board, integrating multiple electronic components including an LCD, stepper motor controller board, boost converter, joystick, push buttons, and I/O via custom connectors",
          <li>
            <Text link="http://github.com/simmsa/slidelapse">Programmed</Text>
            <Text> a feature rich joystick controlled menu system with:</Text>
          </li>,
          <ul>
            <li>
              <Text>
                User customizable timelapse, video, and joystick modes.
              </Text>
            </li>
            <li>
              <Text>Multiple movement algorithms including </Text>
              <Text link="https://github.com/simmsa/slidelapse/blob/master/src/sketch.ino#L264-L414">
                bezier curves
              </Text>
              <Text>
                {" "}
                exponential, and linear, with optimized (less precise) velsions
                of bezier algorithoms for faster movement
              </Text>
            </li>
            <li>
              Multiple movement profiles for different timelapse shooting
              conditions, including continuous motion for daytime timelapses and
              shoot-move-shoot for astrophotography and uphill shooting.
            </li>
            <li>
              An efficent power mode to increase battery life, utilizing the
              stepper motor controllers sleep function
            </li>
            <li>
              Easing functions to gently start and stop movement, preventing
              camera shake.
            </li>
            <li>
              Optimized string memory usage by storing characters in PROGMEM.
            </li>
            <li>
              Persistent storage - read and saves user settings via EEPROM.
            </li>
          </ul>,
        ]}
      />
      <Entry
        title="Freelance Web Developer"
        company="Simms Web Development"
        location="Golden, CO"
        extraTitle="PHP, Wordpress, HTML5, CSS3, JavaScript"
        startDate="Oct 2011"
        endDate="May 2014"
        points={[
          "Worked with small business clients to build small, ~1K LOC, custom websites with WordPress and HTML/CSS",
          "Deployed and provided ongoing support to sites hosted on BlueHost",
          "Optimized copy to improve Google search rankings",
          "Implemented user tracking and reporting via Google Analytics",
        ]}
      />
    </Section>
    <Section>
      <SectionTitle hasUnderline={true}>
        Personal Software Projects
      </SectionTitle>
      <Entry
        title="Home Watchdog Data Acquisition System (DAS)"
        extraTitle="Python, Raspberry Pi, Linux, Typescript, React"
        link="http://github.com/simmsa/home_das"
        startDate="Oct 2020"
        endDate="Sept 2021"
        points={[
          <>
            <Text>
              Single device Raspberry Pi (RPi) based dosing pump monitor and
              logger with data visualization heavy front-end.
            </Text>
            <ul>
              <li>
                <Text>
                  Built a complete end to end DAS using a RPi, Python,{" "}
                </Text>
                <Text link="https://pi-plates.com/daqc2-users-guide/">
                  Pi-Plates DAQC2 Pi Hat
                </Text>
                <Text> and current transducer.</Text>
              </li>
              <li>
                <Text>
                  Programmed in Python a watchdog data acquisition loop which
                  triggers data recording when current transformer senses pump
                  initialization.
                </Text>
              </li>
              <li>
                <Text>
                  Developed a custom data visualization dashboard with
                  TypeScript, React.js, Material-UI, and Recharts.
                </Text>
              </li>
            </ul>
          </>,
          <br />,
          <br />,
          <br />,
          <br />,
        ]}
      />
      <Entry
        title="Jefferson County Courage Garden - Website"
        extraTitle="WordPress, PHP, HTML5, CSS3, JavaScript, jQuery"
        link="http://couragegardenplants.com"
        startDate="Jan 2013"
        endDate="May 2013"
        points={[
          <>
            <Text>
              Volunteer work - Website for cataloging and identification of
              plants at the{" "}
            </Text>
            <Text link="https://www.victimoutreach.org/programs.php">
              Jefferson County Courage Garden
            </Text>
            <ul>
              <li>
                <Text>
                  Developed custom templates for WordPress in PHP to support
                  display of specific plant information.
                </Text>
              </li>
              <li>
                <Text>
                  Used "WP Custom Search" plugin to add attribute search and
                  filtering functionality.
                </Text>
              </li>
              <li>
                <Text>
                  Iterated to create branding and color theme per client specs.
                </Text>
              </li>
              <li>
                <Text>
                  Used custom media queries and styling in CSS3 to optimize
                  viewing area for mobile and tablet devices.
                </Text>
              </li>
              <li>
                <Text>
                  Styled custom print templates with QR codes for users to
                  easily print information in an optimized format.
                </Text>
              </li>
            </ul>
          </>,
        ]}
      />
      <Entry
        title="Dark Mode - Google Chrome Extension"
        extraTitle="TypeScript, React.js, Chrome Extension API"
        link="http://github.com/simmsa/dark-mode"
        startDate="Apr 2015"
        endDate="Mar 2018"
        points={[
          <>
            <Text>
              Google Chrome extension to invert colors on websites to improve
              readability.
            </Text>
            <ul>
              <li>
                <Text>
                  Developed custom CSS styling rules to filter white colors, and
                  correct color shift artifacts.
                </Text>
              </li>
              <li>
                <Text>
                  Built custom UI in React for users to configure settings on a
                  per site/domain basis.
                </Text>
              </li>
              <li>
                <Text>
                  Used Google Chrome API to communicate between background and
                  foreground process to allow users to toggle settings and see
                  results in real-time.
                </Text>
              </li>
            </ul>
          </>,
        ]}
      />
    </Section>
    <Section>
      <SectionTitle hasUnderline={true}>Education</SectionTitle>
      <Entry
        title="B.S. in Business Administration, emphasis in Finance"
        extraTitle="Capital Investment Analysis, Entreprenurial Finance"
        company="University of Colorado Boulder - Leeds School of Business"
        location="Boulder, CO"
        startDate="Aug 2005"
        endDate="May 2010"
        points={[
          "Gained a strong understanding of capital investment analysis, quantative finance, and entreprenurial finance",
          "Worked part-time through school, graduating debt free",
          <>
            <Text>Member of </Text>
            <Text link="https://www.colorado.edu/business/student-resources/student-organizations/multicultural-business-students-association">
              Multicultural Business Student Association
            </Text>
            <Text>:</Text>
            <ul>
              <li>
                <Text>
                  2006 & 2007 group leader for the{" "}
                  <Text link="https://www.colorado.edu/business/oda/programs-high-school-students/business-leadership-program">
                    Business Leadership Program
                  </Text>
                  , a week long on campus summer marketing & business
                  scholarship competition for high school students,
                </Text>
              </li>
              <li>
                <Text>
                  Taught classes about creating effective presentations, public
                  speaking, and graphic design.
                </Text>
              </li>
            </ul>
          </>,
          <>
            <Text>Varsity Road Cyclist:</Text>
            <ul>
              <li>
                <Text>
                  Advanced from Junior to Varsity level, competing in 24 road
                  cycling races in the Big 12 conference.
                </Text>
              </li>
              <li>
                <Text>
                  Mentored new and upcoming team members, providing tactical
                  racing advice, mechanical support, and training rides.
                </Text>
              </li>
            </ul>
          </>,
        ]}
      />
    </Section>
    <Section>
      <SectionTitle hasUnderline={true}>
        Other Employment Experience
      </SectionTitle>
      <Entry
        title="Food Expo, Bar Back, Busser"
        company="Bacaro Venetian Taverna (Italian Restaurant)"
        location="Boulder, CO"
        extraTitle="Customer Support"
        startDate="May 2011"
        endDate="June 2008"
        points={[
          "Managed interaction between wait staff and kitchen, ensuring food was prepared correctly and on-time",
          "Worked directly with bar staff, ensuring that customer needs were met in a timely and friendly fashion",
        ]}
      />
      <Entry
        title="Martial Arts Instructor"
        company="Colorado Taekwondo Institute"
        location="Westminster, CO"
        extraTitle="Teaching, Planning"
        startDate="Apr 2008"
        endDate="Sept 2005"
        points={[
          "Taught and trained students ages 2 to adult in the Moo Sul Kwan style of Taekwondo",
          "Created training plans to prepare students for promotion testing and competition events",
        ]}
      />
      <Entry
        title="Program Director"
        company="Colorado Taekwondo Institute"
        location="Littleton, CO"
        extraTitle="Client Interaction, Business Support"
        startDate="Aug 2005"
        endDate="June 2003"
        points={[
          "Designed and distributed marketing materials to advertise current promotional offers and sales",
          "Scheduled and taught introductory classes for prospective customers",
        ]}
      />
    </Section>
    <Section>
      <SectionTitle hasUnderline={true}>Awards and Achievements</SectionTitle>
      <Entry
        points={[
          "Eagle Scout in the Boy Scouts of America",
          "2nd Degree Black Belt in Moo Sul Kwan Taekwondo",
          "Competitive Cyclist with the Clif Bar Cycling Team",
        ]}
      />
    </Section>
  </Container>
)

export default Resume
// <Section>
//   <Text>
//     Current NREL employee and self taught web and mobile app developer with
//     3 years experience seeking a data analytics position to leverage
//     experience building and operating data acquisition systems into a career
//     experience with data acquisition on wind and water projects while making
//     a positive impact on the world.
//   </Text>
// </Section>
// Blade 0 Inner
// 11 * 4 + 2 = 44
// Blade 1 Inner
// 6 * 4 = 24
// Blade 2 Inner
// 4 * 4 = 16
// Blade 3 inner
// 4 * 4 + 2 = 18
// Epoxy Outer
//     36
// Blade 0 Outer = 40
