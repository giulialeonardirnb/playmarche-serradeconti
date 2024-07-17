import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import line from "./../assets/img/line.png";
import { t } from "i18next";
import BackButton from "../components/BackButton";
import SecondaryButton from "../components/SecondaryButton";
import Logo from "../components/Logo";
import SignupForm from "../components/SignupForm";
import { ThemeContext } from "../contexts";

const Signup = () => {
  const colors = useContext(ThemeContext)?.colors;

  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    setShowIcons(true);
  }, []);

  const styles = {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundColor: colors?.menuBackground,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    textContainer: {
      marginBottom: 10,
      width: "60%",
    },
    registrationTitle: {
      marginTop: 20,
      marginBottom: 20,
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 900,
      fontSize: 30,
      color: "white",
    },
    registrationSubTitle: {
      marginTop: 0,
      marginBottom: 20,
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 500,
      fontSize: 20,
      color: "white",
    },
    line: {
      width: "70%",
      marginTop: 10,
      marginBottom: 10,
    },
    bodyContainer: {
      flex: 4,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "opacity 1.5s",
      opacity: !showIcons ? 0 : 1,
    },
    link: {
      textDecoration: "none",
      marginTop: 40,
      marginBottom: 20,
      display: "flex",
      alignItems: "center",
    },
    warning: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
      fontSize: 24,
      color: colors?.white,
    },
  };

  return (
    <div style={styles.container}>
      <BackButton pathToFollow={"/language"} />
      <Logo />
      <div style={styles.bodyContainer}>
        <img alt="Line" src={line} style={styles.line} />
        <div style={styles.textContainer}>
          <p style={styles.registrationTitle}>
            {t("registration").toUpperCase()}
          </p>
          <p style={styles.registrationSubTitle}>{t("registrationSubtitle")}</p>
        </div>
        <SignupForm />
        <img alt="Line" src={line} style={styles.line} />
        <Link to="/tutorial" style={styles.link}>
          <SecondaryButton label={t("skip")} />
        </Link>
      </div>
    </div>
  );
};

export default Signup;
