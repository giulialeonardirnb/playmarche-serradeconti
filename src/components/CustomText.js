import React, { useRef, useEffect, useContext, useState } from "react";
import easyreadinglogo_en from "../assets/img/easyreadinglogo_en.png";
import easyreadinglogodark_en from "../assets/img/easyreadinglogodark_en.png";
import easyreadinglogo_it from "../assets/img/easyreadinglogo_it.png";
import easyreadinglogodark_it from "../assets/img/easyreadinglogodark_it.png";
import { ThemeContext } from "../contexts";
import i18next from "i18next";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const CustomText = ({ content, easyread, easyreadLogo, setFruition }) => {
  const colors = useContext(ThemeContext)?.colors;
  const theme = useContext(ThemeContext)?.theme;
  const divRef = useRef();
  const contRef = useRef();

  const [initialHeight, setInitialHeight] = useState(0);
  const prevInitialHeight = usePrevious(initialHeight);
  const [maxScrolled, setMaxScrolled] = useState(0);
  const prevMaxScrolled = usePrevious(maxScrolled);

  const styles = {
    container: {
      marginTop: 20,
      marginBottom: 20,
      width: "90%",
      overflow: "scroll",
    },
    body: {
      fontFamily: easyread ? "EasyReading" : "'Montserrat', sans-serif",
      fontSize: 26,
      textAlign: "justify",
      textJustify: "inter-word",
      margin: 0,
      paddingLeft: 30,
      paddingRight: 30,
      color: colors?.text,
    },
    easyReadLogo: {
      height: "10%",
      marginTop: 50,
    },
  };
  useEffect(() => {
    setTimeout(() => {
      //Get final height of the element after initial slide up animation animation
      setInitialHeight(contRef.current.offsetHeight);
    }, [800]);
  }, []);

  useEffect(() => {
    const computeTextPercentage = () => {
      var scrollPercentage = Math.ceil(
        parseFloat(
          (maxScrolled + initialHeight) / contRef.current.scrollHeight
        ) * 100
      );
      return scrollPercentage;
    };
    if (
      prevInitialHeight !== initialHeight ||
      prevMaxScrolled !== maxScrolled
    ) {
      if (!!setFruition) {
        setFruition(computeTextPercentage());
      }
    }
  }, [
    prevInitialHeight,
    initialHeight,
    maxScrolled,
    prevMaxScrolled,
    setFruition,
  ]);

  useEffect(() => {
    if (!!content) {
      divRef.current.innerHTML = content.text;
    }
  }, [content]);

  return (
    <div
      ref={contRef}
      style={styles.container}
      onScroll={(e) => {
        if (e.target.scrollTop > maxScrolled) {
          setMaxScrolled(e.target.scrollTop);
        }
      }}
    >
      <div ref={divRef} style={styles.body}>
        {
          //Custom content will be programmatically inserted in div below
        }
        <div></div>
      </div>
      {easyreadLogo && (
        <img
          alt="EasyRead logo"
          src={
            theme === "dark"
              ? i18next.language === "italiano"
                ? easyreadinglogodark_it
                : easyreadinglogodark_en
              : i18next.language === "italiano"
              ? easyreadinglogo_it
              : easyreadinglogo_en
          }
          style={styles.easyReadLogo}
        />
      )}
    </div>
  );
};

export default CustomText;
