import { React, useContext } from "react";
import text from "../assets/img/text.png";
import textdark from "../assets/img/textdark.png";
import { ThemeContext } from "../contexts";

const TextContent = ({ setContentSelected }) => {
  const theme = useContext(ThemeContext)?.theme;

  const styles = {
    icon: {
      width: 120,
      margin: 20,
    },
  };
  return (
    <img
      alt="Text content"
      src={theme === "dark" ? textdark : text}
      style={styles.icon}
      onClick={() => setContentSelected("text")}
    />
  );
};

export default TextContent;
