import React from "react";
import white_dot from "./../assets/img/dot.png";
import dotselected from "./../assets/img/dotselected.png";

const Dots = (props) => {
  const styles = {
    dots: {
      width: "20%",
      display: "flex",
      justifyContent: "center",
    },
    dot: {
      marginLeft: 5,
      marginRight: 5,
      height: "40%",
    },
  };

  return (
    <div style={styles.dots}>
      {new Array(props.totSlides).fill("").map((_, index) => {
        return (
          <img
            key={index}
            alt="dot"
            src={props.currentSlide === index + 1 ? dotselected : white_dot}
            style={styles.dot}
          />
        );
      })}
    </div>
  );
};

export default Dots;
