import { React, useContext } from "react";
import { ThemeContext } from "../contexts";
import CustomText from "./CustomText";
import eu_logo from "./../assets/img/eu_logo.png";
import eu_logo_dark from "./../assets/img/eu_logo_dark.png";
import mic_logo from "./../assets/img/mic_logo.png";
import mic_logo_dark from "./../assets/img/mic_logo_dark.png";

const InfoComponent = ({ content, setContentSelected }) => {
  const theme = useContext(ThemeContext)?.theme;
  const styles = {
    container: {
      width: "100%",
      height: "90%",
      flexDirection: "column",
      display: "flex",
      alignItems: "center",
      borderRadius: 50,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      position: "relative",
      transition: "height .8s ease-in-out",
    },
    infoImgsContainer: {
      display: "flex",
      flexDirection: "row",
      marginTop: 40,
    },
    infoImg: {
      marginInline: 20,
      height: 60,
    },
  };
  return (
    <div style={styles.container}>
      <CustomText content={content} easyread={false} easyreadLogo={false} />
      <div style={styles.infoImgsContainer}>
        <img
          alt="infoImg"
          style={styles.infoImg}
          src={theme === "dark" ? eu_logo_dark : eu_logo}
        ></img>
        <img
          alt="infoImg"
          style={styles.infoImg}
          src={theme === "dark" ? mic_logo_dark : mic_logo}
        ></img>
      </div>
    </div>
  );
};

export default InfoComponent;
