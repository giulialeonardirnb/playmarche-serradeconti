import { React, useContext } from "react";
import { ThemeContext } from "../contexts";
import waving_hand from "./../assets/img/waving_hand.png";
import waving_hand_selected from "./../assets/img/waving_hand_selected.png";

const PoiMenuComponent = ({ id, poi, poiSelected, setPoiSelected, label }) => {
  const colors = useContext(ThemeContext)?.colors;

  const isSelected = () => {
    return poiSelected?.id === poi.id;
  };

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
      backgroundColor: isSelected() ? colors?.menuHighlight : colors?.white,
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
      color: isSelected() ? colors?.white : colors?.secondary,
    },
    specialLabel: {
      fontStyle: "'Montserrat', sans-serif",
      fontWeight: "900",
      fontSize: 40,
      margin: 0,
      color: isSelected() ? colors?.white : colors?.secondary,
    },
    icon: {
      height: 100,
    },
  };

  return (
    <div style={styles.container} onClick={() => setPoiSelected(poi.id)}>
      <div style={styles.poi}>
        {id === 0 ? (
          <img
            alt="icon"
            style={styles.icon}
            src={isSelected() ? waving_hand_selected : waving_hand}
          />
        ) : (
          <div>
            <p style={styles.label}>{label.split(" ")[0].toUpperCase()}</p>
            <p style={styles.specialLabel}>{label.split(" ")[1]}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoiMenuComponent;
