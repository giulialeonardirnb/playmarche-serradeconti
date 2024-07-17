import React, { useContext } from "react";
import { ThemeContext } from "../contexts";
import circle from "./../assets/img/circle.png";
import circleChecked from "./../assets/img/circleselected.png";

const Option = ({ option, selected, setSelected }) => {
  const colors = useContext(ThemeContext)?.colors;

  const isSelected = () => {
    return selected === option;
  };

  const styles = {
    container: {
      width: 300,
      height: 80,
      backgroundColor: isSelected() ? colors?.primary : "transparent",
      borderRadius: 50,
      padding: 40,
      paddingTop: 20,
      paddingBottom: 20,
      marginTop: 40,
      marginBottom: 40,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      border: "2px solid",
      borderColor: isSelected() ? colors?.primary : colors?.white,
    },
    label: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: 30,
      fontWeight: 700,
      color: colors?.white,
    },
  };

  return (
    <button style={styles.container} onClick={() => setSelected(option)}>
      <p style={styles.label}>{option.toUpperCase()}</p>
      <img
        alt="Selection"
        style={{ width: 50 }}
        src={isSelected() ? circleChecked : circle}
      />
    </button>
  );
};

export default Option;
