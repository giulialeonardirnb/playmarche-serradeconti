import { React, useContext } from "react";
import { ThemeContext } from "../contexts";

const PoiComponent = ({ poi, side, poiSelected, setPoiSelected }) => {
  const colors = useContext(ThemeContext)?.colors;

  const isSelected = () => {
    return poiSelected?.id === poi.id;
  };
  const styles = {
    poi: {
      backgroundColor: isSelected() ? colors?.highlight : colors?.secondary,
      width: 100,
      height: 100,
      borderRadius: 15,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginInline: 5,
      marginBlock: 5,
    },
    label: {
      fontStyle: "'Montserrat', sans-serif",
      fontWeight: "800",
      fontSize: 40,
      margin: 0,
      color: colors?.white,
    },
  };

  return (
    <div
      style={{
        ...styles.poi,
        marginLeft: side === "left" && 80,
        marginRight: side === "right" && 80,
      }}
      onClick={() => setPoiSelected(poi.id)}
    >
      <div style={styles.labelContainer}>
        {poi.label.map((label, key) => {
          return (
            <p key={key} style={styles.label}>
              {label}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default PoiComponent;
