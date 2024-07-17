import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts";

const MenuChoice = ({ id, path, label, statLabel, config, glossary, info }) => {
  const colors = useContext(ThemeContext)?.colors;
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
      border: "none",
      textDecoration: "none",
    },
    poi: {
      backgroundColor: colors?.white,
      width: 180,
      height: 180,
      borderRadius: 15,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 5,
    },
    label: {
      fontStyle: "'Montserrat', sans-serif",
      fontWeight: "700",
      fontSize: 30,
      margin: 0,
      color: colors?.secondary,
    },
    specialLabel: {
      fontStyle: "'Montserrat', sans-serif",
      fontWeight: "900",
      fontSize: 40,
      margin: 0,
      color: colors?.secondary,
    },
  };

  return (
    <Link
      to={path}
      style={styles.container}
      state={{
        section: label,
        statSection: statLabel,
        number: id,
        config: config,
        glossary: glossary,
        info: info,
      }}
    >
      <div style={styles.poi}>
        {id !== 0 && (
          <div>
            <p style={styles.label}>{label.split(" ")[0].toUpperCase()}</p>
            <p style={styles.specialLabel}>{label.split(" ")[1]}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default MenuChoice;
