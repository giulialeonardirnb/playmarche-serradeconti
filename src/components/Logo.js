import { React } from "react";
import logo from "./../assets/img/logo.png";

const Logo = () => {
  const styles = {
    logoContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: 200,
    },
  };

  return (
    <div style={styles.logoContainer}>
      <img alt="Logo" src={logo} style={styles.logo} />
    </div>
  );
};

export default Logo;
