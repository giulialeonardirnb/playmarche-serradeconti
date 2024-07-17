import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext, VisitorContext } from "../contexts";
import logo from "./../assets/img/open_logo.png";

const Start = () => {
  const colors = useContext(ThemeContext).colors;
  const setVisitor = useContext(VisitorContext)?.setVisitor;
  const setInfoVisitor = useContext(VisitorContext)?.setInfoVisitor;

  const [showIcons, setShowIcons] = useState(false);
  const styles = {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundColor: colors?.menuBackground,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: "70%",
      transition: "opacity 2.5s",
      opacity: !showIcons ? 0 : 1,
    },
  };

  useEffect(() => {
    setShowIcons(true);
    setVisitor(null);
    setInfoVisitor(null);
  }, [setVisitor, setInfoVisitor]);

  return (
    <Link to="/language" style={styles.container}>
      <img alt="Logo" src={logo} style={styles.logo} />
    </Link>
  );
};

export default Start;
