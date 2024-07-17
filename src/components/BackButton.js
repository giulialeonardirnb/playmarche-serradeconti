import { React } from "react";
import { Link } from "react-router-dom";
import back from "./../assets/img/back.png";

const BackButton = (props) => {
  const styles = {
    backContainer: {
      display: "flex",
      justifyContent: "flex-start",
      width: "100%",
      position: "fixed",
      top: 50,
      left: 50,
    },
    back: {
      width: 20,
      height: 30,
    },
  };
  return (
    <Link to={props.pathToFollow} style={styles.backContainer}>
      <img alt="Back" src={back} style={styles.back} />
    </Link>
  );
};

export default BackButton;
