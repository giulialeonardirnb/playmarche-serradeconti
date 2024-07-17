import { React } from "react";

const PrimaryButton = ({ label, bgColor, txtColor, onClick }) => {
  const styles = {
    container: {
      width: 300,
      height: 70,
      backgroundColor: bgColor,
      borderRadius: 50,
      padding: 40,
      paddingTop: 20,
      paddingBottom: 20,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "none",
    },
    label: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: 30,
      fontWeight: 700,
      color: txtColor,
    },
  };
  return (
    <button style={styles.container} onClick={onClick}>
      <p style={styles.label}>{label.toUpperCase()}</p>
    </button>
  );
};

export default PrimaryButton;
