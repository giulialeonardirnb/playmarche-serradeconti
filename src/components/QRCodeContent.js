import { React, useContext } from "react";
import qrcode from "../assets/img/qrcode.png";
import qrcodedark from "../assets/img/qrcodedark.png";
import { ThemeContext } from "../contexts";

const QRCodeContent = ({ setContentSelected }) => {
  const theme = useContext(ThemeContext)?.theme;

  const styles = {
    icon: {
      width: 120,
      margin: 20,
    },
  };
  return (
    <img
      alt="QR code content"
      src={theme === "dark" ? qrcodedark : qrcode}
      style={styles.icon}
      onClick={() => setContentSelected("qrcode")}
    />
  );
};

export default QRCodeContent;
