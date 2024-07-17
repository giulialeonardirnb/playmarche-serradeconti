import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../contexts";
import arrowdown from "./../assets/img/arrowdown.png";
import arrowdowndark from "./../assets/img/arrowdowndark.png";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
const BodyComponent = ({ title, body, setContentSelected, onClose }) => {
  const colors = useContext(ThemeContext)?.colors;
  const theme = useContext(ThemeContext)?.theme;
  const [height, setHeight] = useState(0);
  const prevHeight = usePrevious(height);

  const styles = {
    container: {
      width: "100%",
      height: height,
      marginTop: 10,
      backgroundColor: colors?.bodybackground,
      flexDirection: "column",
      display: "flex",
      alignItems: "center",
      borderRadius: 50,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      position: "relative",
      transition: "height .8s ease-in-out",
    },
    icon: {
      position: "absolute",
      right: 35,
      top: 35,
      width: "6%",
    },
    title: {
      fontStyle: "'Montserrat', sans-serif",
      fontWeight: 700,
      color: colors?.highlight,
      fontSize: 35,
      marginTop: 40,
      width: "75%",
      lineHeight: 1.2,
    },
  };

  useEffect(() => {
    setHeight("100%");
  }, []);

  useEffect(() => {
    return () => {
      setHeight(0);
    };
  }, []);

  useEffect(() => {
    if (!!prevHeight && height === 0) {
      if (!!onClose) {
        onClose();
      }
      setTimeout(() => {
        setContentSelected(null);
      }, 800);
    }
  }, [prevHeight, height, setContentSelected, onClose]);

  return (
    <div style={styles.container}>
      <img
        alt="Arrow down"
        src={theme === "dark" ? arrowdowndark : arrowdown}
        style={styles.icon}
        onClick={() => setHeight(0)}
      />
      <p id="textTitle" style={styles.title}>
        {title.toUpperCase()}
      </p>
      {body}
    </div>
  );
};

export default BodyComponent;
