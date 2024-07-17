import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import character from "./../assets/img/character.png";
import characterBye from "./../assets/img/character_bye.png";
import { t } from "i18next";
import { ThemeContext } from "../contexts";

const Intro = () => {
  const colors = useContext(ThemeContext)?.colors;
  const navigate = useNavigate();
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const [clicked, setClicked] = useState(0);
  const [conversationText, setConversationText] = useState(t("intro1"));
  const [imgSource, setImgSource] = useState(character);

  const styles = {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundColor: colors?.menuBackground,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    characterContainer: {
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    characterImg: {
      height: 600,
    },
    conversation: {
      color: "white",
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
      fontSize: 40,
      alignText: "center",
    },
  };

  useEffect(() => {
    // img starts
    setClicked(1);

    // after 3s, 1st text starts
    setTimeout(() => {
      setClicked(2);
    }, 3000);

    // after 3s, change text (2nd text)
    setTimeout(() => {
      setConversationText(t("intro2"));
    }, 6000);

    // after 3s, change text (3rd and last text)
    setTimeout(() => {
      setConversationText(t("intro3"));
      setImgSource(characterBye);
    }, 9000);

    // after 3s, automatically go to the next view
    const timer = setTimeout(() => {
      if (window.location.pathname === "/intro") {
        navigate("/signup");
      } else {
        clearTimeout(timer);
      }
    }, 12000);
    // eslint-disable-next-line
  }, []);

  return (
    <button
      style={styles.container}
      onClick={() => {
        if (clicked === 2) {
          navigate("/signup");
        }
        setClicked(clicked + 1);
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -windowWidth,
          transform: clicked > 0 ? "translateX(" + windowWidth + "px)" : "none",
          transition: "all 3000ms ease-out 200ms",
        }}
      >
        <div style={styles.characterContainer}>
          <img alt="Character" style={styles.characterImg} src={imgSource} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          width: windowWidth,
          top: windowHeight / 8,
          left: -windowWidth,
          transform: clicked > 1 ? "translateX(" + windowWidth + "px)" : "none",
          transition: "all 1500ms ease-out 200ms",
        }}
      >
        <p style={styles.conversation}>{conversationText}</p>
      </div>
    </button>
  );
};

export default Intro;
