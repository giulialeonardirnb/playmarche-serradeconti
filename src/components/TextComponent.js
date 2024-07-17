import React, { useEffect, useState } from "react";
import CustomText from "./CustomText";
import ImageCarousel from "./ImagesCarousel";

const TextComponent = ({ content, setStart, setFruition }) => {
  var titleElement = document.getElementById("textTitle");
  const [conditionalHeight, setConditionalHeight] = useState("90%");
  const styles = {
    container: {
      width: "100%",
      height: conditionalHeight,
      flexDirection: "column",
      display: "flex",
      alignItems: "center",
      borderRadius: 50,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      position: "relative",
      transition: "height .8s ease-in-out",
    },
  };

  useEffect(() => {
    setStart(Date.now());
  }, [setStart]);

  useEffect(() => {
    setConditionalHeight(
      95 -
        6 *
          (parseInt(titleElement?.offsetHeight) /
            parseInt(titleElement?.style.fontSize)) +
        "%"
    );
  }, [titleElement]);

  return (
    <div style={styles.container}>
      <ImageCarousel imagesList={content?.img} />
      <CustomText
        content={content}
        easyread={true}
        easyreadLogo={true}
        setFruition={setFruition}
      />
    </div>
  );
};

export default TextComponent;
