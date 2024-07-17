import { React, useContext } from "react";
import { Link } from "react-router-dom";
import home from "./../assets/img/home.png";
import info from "./../assets/img/info.png";
import infoselected from "./../assets/img/infoselected.png";
import infoselecteddark from "./../assets/img/infoselecteddark.png";
import book from "./../assets/img/book.png";
import bookselected from "./../assets/img/bookselected.png";
import bookselecteddark from "./../assets/img/bookselecteddark.png";
import setting from "./../assets/img/setting.png";
import settingselected from "./../assets/img/settingselected.png";
import settingselecteddark from "./../assets/img/settingselecteddark.png";
import help from "./../assets/img/help.png";
import { ThemeContext } from "../contexts";

const MenuBar = ({ contentSelected, setContentSelected }) => {
  const colors = useContext(ThemeContext)?.colors;
  const theme = useContext(ThemeContext)?.theme;

  const styles = {
    container: {
      width: "100%",
      height: "5%",
      borderRadius: 50,
      backgroundColor: colors?.quaternary,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 40,
    },
    subcontainer: {
      height: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginLeft: 20,
      marginRight: 20,
    },
    link: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      height: "70%",
      objectFit: "contain",
      margin: 5,
    },
  };
  return (
    <div style={styles.container}>
      <div style={styles.subcontainer}>
        <Link to="/menu" style={styles.link}>
          <img alt="Home" style={styles.icon} src={home} />
        </Link>
        <Link to="/tutorial" style={styles.link}>
          <img alt="Help" style={styles.icon} src={help} />
        </Link>
        <img
          alt="Guide"
          style={styles.icon}
          src={
            contentSelected === "glossary"
              ? theme === "dark"
                ? bookselecteddark
                : bookselected
              : book
          }
          onClick={() => setContentSelected("glossary")}
        />
      </div>
      <div style={styles.subcontainer}>
        <img
          alt="Settings"
          style={styles.icon}
          src={
            contentSelected === "settings"
              ? theme === "dark"
                ? settingselecteddark
                : settingselected
              : setting
          }
          onClick={() => setContentSelected("settings")}
        />
        <img
          alt="Info"
          style={styles.icon}
          src={
            contentSelected === "info"
              ? theme === "dark"
                ? infoselecteddark
                : infoselected
              : info
          }
          onClick={() => setContentSelected("info")}
        />
      </div>
    </div>
  );
};

export default MenuBar;
