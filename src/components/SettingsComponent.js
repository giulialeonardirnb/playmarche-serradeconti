import { React, useContext } from "react";
import { t } from "i18next";
import Switch from "react-switch";
import { ThemeContext } from "../contexts";

const SettingsComponent = () => {
  const colors = useContext(ThemeContext)?.colors;
  const theme = useContext(ThemeContext)?.theme;
  const setTheme = useContext(ThemeContext)?.setTheme;

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
    settingsContainer: {
      marginTop: 20,
      marginBottom: 20,
      width: "70%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    label: {
      fontSize: 26,
      color: colors?.text,
      fontFamily: '"Montserrat", sans-serif',
    },
    switchContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "90%",
      marginRight: 20,
      marginLeft: 10,
    },
  };
  return (
    <div style={styles.container}>
      <div style={styles.settingsContainer}>
        <p style={styles.label}>{t("darkModeLabel")}</p>
        <div style={styles.switchContainer}>
          <Switch
            onChange={() => {
              if (theme === "dark") {
                setTheme("light");
              } else {
                setTheme("dark");
              }
            }}
            checked={theme === "dark"}
            checkedIcon={false}
            uncheckedIcon={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;
