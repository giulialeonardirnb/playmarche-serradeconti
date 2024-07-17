import React, { useState, useEffect, useContext } from "react";
import PrimaryButton from "../components/PrimaryButton";
import Option from "../components/Option";
import i18next, { t } from "i18next";
import logo from "./../assets/img/logo.png";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts";

const Language = () => {
  const colors = useContext(ThemeContext)?.colors;

  const languages = i18next.languages.sort().reverse();
  const [lang, setLang] = useState(i18next.language);
  const [showIcons, setShowIcons] = useState(false);

  const styles = {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundColor: colors?.menuBackground,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    choicesBox: {
      display: "flex",
      flexDirection: "column",
      flex: 4,
      maxHeight: "70%",
      paddingTop: "50%",
      justifyContent: "start",
    },
    logo: {
      width: 200,
    },
    logoContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    bodyContainer: {
      flex: 3,
      flexDirection: "column",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "opacity 2.5s",
      opacity: !showIcons ? 0 : 1,
    },
    buttonBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "end",
      marginBottom: 100,
    },
    link: { textDecoration: "none" },
  };

  useEffect(() => {
    setShowIcons(true);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <img alt="Logo" src={logo} style={styles.logo} />
      </div>
      <div style={styles.bodyContainer}>
        <div style={styles.choicesBox}>
          {languages?.map((language, key) => {
            return (
              <Option
                key={key}
                option={language}
                selected={lang}
                setSelected={(option) => {
                  i18next.changeLanguage(option);
                  setLang(i18next.language);
                }}
              />
            );
          })}
        </div>

        <div style={styles.buttonBox}>
          <Link to="/intro" style={styles.link}>
            <PrimaryButton
              label={t("continue")}
              bgColor={colors?.primary}
              txtColor={colors?.white}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Language;
