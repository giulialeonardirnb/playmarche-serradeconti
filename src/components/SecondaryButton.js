import React, { useContext } from "react";
import { ThemeContext } from "../contexts";

const SecondaryButton = ({ label, onClick }) => {
  const colors = useContext(ThemeContext)?.colors;

  const styles = {
    container: {
      width: 300,
      height: 70,
      backgroundColor: "transparent",
      borderRadius: 50,
      padding: 40,
      paddingTop: 20,
      paddingBottom: 20,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "2px solid white",
    },
    label: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: 30,
      fontWeight: 700,
      color: colors?.white,
    },
  };
  return (
    <button style={styles.container} onClick={onClick}>
      <p style={styles.label}>{label.toUpperCase()}</p>
    </button>
  );
};

export default SecondaryButton;
