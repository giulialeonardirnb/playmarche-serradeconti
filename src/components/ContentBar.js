import { React, useState, useEffect } from "react";
import AudioContent from "./AudioContent";
import TextContent from "./TextContent";
import QRCodeContent from "./QRCodeContent";

const ContentBar = ({
  section,
  statSection,
  content,
  contentSelected,
  setContentSelected,
}) => {
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    setAudioPlaying(false);
  }, [content]);

  const styles = {
    container: {
      width: "100%",
      height: "15%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    subcontainer: {
      height: 120,
      width: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 20,
      marginRight: 20,
    },
  };
  return (
    <div style={styles.container}>
      <div style={styles.subcontainer}>
        {!!content?.audio && (
          <AudioContent
            section={section}
            statSection={statSection}
            content={content}
            contentSelected={contentSelected}
            setContentSelected={setContentSelected}
            setAudioPlaying={setAudioPlaying}
          />
        )}
        {!!content?.text && !audioPlaying && (
          <TextContent
            section={section}
            content={content.text}
            img={content.img}
            contentSelected={contentSelected}
            setContentSelected={setContentSelected}
          />
        )}
        {!!content?.qrcode && !audioPlaying && (
          <QRCodeContent
            section={section}
            contentSelected={contentSelected}
            setContentSelected={setContentSelected}
          />
        )}
      </div>
    </div>
  );
};

export default ContentBar;
