import React from "react";

const TutorialStep = (props) => {
  const styles = {
    tutorialSubcontainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },
    title: {
      marginBottom: 40,
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
      fontSize: 30,
      color: "white",
      height: 50,
    },
    img: {
      height: 300,
    },
    explainationContainer: {
      width: 600,
      minHeight: 180,
    },
    explanation: {
      marginTop: 50,
      marginBottom: 50,
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 500,
      fontSize: 26,
      color: "white",
    },
  };
  return (
    <div style={styles.tutorialSubcontainer}>
      <div style={styles.title}>
        <p>{props.slide.title ? props.slide.title : ""}</p>
      </div>
      <img alt="img" src={props.slide.img} style={styles.img} />
      <div style={styles.explainationContainer}>
        <p style={styles.explanation}>{props.slide.explanation}</p>
      </div>
    </div>
  );
};

export default TutorialStep;
