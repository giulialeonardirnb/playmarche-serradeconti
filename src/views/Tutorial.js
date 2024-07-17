import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import line from "./../assets/img/line.png";
import img1 from "./../assets/img/tut1.png";
import img2 from "./../assets/img/tut2.png";
import img3 from "./../assets/img/tut3.png";
import img4 from "./../assets/img/tut4.png";
import img5 from "./../assets/img/tut5.png";
import img6 from "./../assets/img/tut6.png";
import img7 from "./../assets/img/tut7.png";
import img8 from "./../assets/img/tut8.png";
import img9 from "./../assets/img/tut9.png";
import { t } from "i18next";
import BackButton from "../components/BackButton";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import Logo from "../components/Logo";
import TutorialStep from "../components/TutorialStep";
import Dots from "../components/Dots";
import { ThemeContext } from "../contexts";

const Tutorial = () => {
  const colors = useContext(ThemeContext)?.colors;
  const navigate = useNavigate();

  const [showIcons, setShowIcons] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const tutorialArray = [
    { title: t("tutorial_t1"), img: img1, explanation: t("tutorial_e1") },
    { title: "", img: img2, explanation: t("tutorial_e2") },
    { title: "", img: img3, explanation: t("tutorial_e3") },
    { title: "", img: img4, explanation: t("tutorial_e4") },
    { title: "", img: img5, explanation: t("tutorial_e5") },
    { title: "", img: img6, explanation: t("tutorial_e6") },
    { title: "", img: img7, explanation: t("tutorial_e7") },
    { title: "", img: img8, explanation: t("tutorial_e8") },
    { title: "", img: img9, explanation: t("tutorial_e9") },
  ];

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
    tutorialContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      flex: 4,
      transition: "opacity 1.5s",
      opacity: !showIcons ? 0 : 1,
    },
    line: {
      width: "70%",
      marginTop: 20,
      marginBottom: 20,
    },
    continueButtonContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 40,
      marginBottom: 40,
    },
    link: {
      textDecoration: "none",
      height: "100%",
      display: "flex",
      alignItems: "center",
    },
  };
  return (
    <div style={styles.container}>
      <BackButton pathToFollow={"/signup"} />

      <Logo />

      <div style={styles.tutorialContainer}>
        <img alt="Line" src={line} style={styles.line} />

        <TutorialStep slide={tutorialArray[currentSlide - 1]} />

        <Dots totSlides={tutorialArray.length} currentSlide={currentSlide} />

        <div style={styles.continueButtonContainer}>
          <PrimaryButton
            label={currentSlide < tutorialArray.length ? t("next") : t("end")}
            bgColor={colors?.primary}
            txtColor={colors?.white}
            onClick={() => {
              currentSlide < tutorialArray.length
                ? setCurrentSlide(currentSlide + 1)
                : navigate("/menu");
            }}
          />
        </div>
        <img alt="Line" src={line} style={styles.line} />
        <Link to="/menu" style={styles.link}>
          <SecondaryButton label={t("skip")} />
        </Link>
      </div>
    </div>
  );
};

export default Tutorial;
