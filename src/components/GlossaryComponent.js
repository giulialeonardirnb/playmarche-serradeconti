import { React, useContext } from "react";
import CustomText from "./CustomText";
import ImageCarousel from "./ImagesCarousel";
import easyreadinglogo_en from "../assets/img/easyreadinglogo_en.png";
import easyreadinglogodark_en from "../assets/img/easyreadinglogodark_en.png";
import easyreadinglogo_it from "../assets/img/easyreadinglogo_it.png";
import easyreadinglogodark_it from "../assets/img/easyreadinglogodark_it.png";
import { ThemeContext } from "../contexts";
import i18next from "i18next";

const GlossaryComponent = ({ content }) => {
  const theme = useContext(ThemeContext)?.theme;

  const styles = {
    container: {
      width: "95%",
      height: "90%",
      flexDirection: "column",
      display: "flex",
      alignItems: "center",
      borderRadius: 50,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      position: "relative",
      transition: "height .8s ease-in-out",
      overflow: "scroll",
    },
    singleContainer: {
      width: "100%",
      flexDirection: "column",
      display: "flex",
      alignItems: "center",
    },
    easyReadLogo: {
      height: "6%",
      marginTop: 30,
      marginBottom: 40,
    },
  };
  return (
    <div style={styles.container}>
      {content?.map((item, key) => {
        return (
          <div style={styles.singleContainer} key={key}>
            <CustomText content={item} easyread={true} easyreadLogo={false} />
            {item?.img && <ImageCarousel imagesList={item?.img} />}
          </div>
        );
      })}
      <img
        alt="EasyRead logo"
        src={
          theme === "dark"
            ? i18next.language === "italiano"
              ? easyreadinglogodark_it
              : easyreadinglogodark_en
            : i18next.language === "italiano"
            ? easyreadinglogo_it
            : easyreadinglogo_en
        }
        style={styles.easyReadLogo}
      />
    </div>
  );
};

export default GlossaryComponent;
