import React, { useState, useEffect, useContext, useRef } from "react";
import ContentBar from "../components/ContentBar";
import Map from "../components/Map";
import MenuBar from "../components/MenuBar";
import LabsComponent from "../components/LabsComponent";
import TextComponent from "../components/TextComponent";
import QRCodeComponent from "../components/QRCodeComponent";
import GlossaryComponent from "../components/GlossaryComponent";
import { useLocation } from "react-router";
import InfoComponent from "../components/InfoComponent";
import SettingsComponent from "../components/SettingsComponent";
import { ThemeContext, VisitorContext } from "../contexts";
import BodyComponent from "../components/BodyComponent";
import { t } from "i18next";
import { behaviorService } from "../services";
import room1_light from "./../assets/img/room1_light.png";
import room1_dark from "./../assets/img/room1_dark.png";
import room2_light from "./../assets/img/room2_light.png";
import room2_dark from "./../assets/img/room2_dark.png";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Room = () => {
  const colors = useContext(ThemeContext)?.colors;
  const theme = useContext(ThemeContext)?.theme;
  const visitor = useContext(VisitorContext)?.visitor;

  const [poi, setPoi] = useState(null);
  const [poiSelected, setPoiSelected] = useState(null);
  const prevPoiSelected = usePrevious(poiSelected);

  const [labs, setLabs] = useState([]);
  const [labSelected, setLabSelected] = useState(null);
  const prevLabSelected = usePrevious(labSelected);

  const [contentSelected, setContentSelected] = useState(null);
  const [fruition, setFruition] = useState(0);
  const [start, setStart] = useState(0);

  let { state } = useLocation();

  const findPoiFromID = (id) => {
    return poi.find((obj) => obj.id === id);
  };

  const getMeasures = (type) => {
    switch (type) {
      case "click":
        return null;
      case "lettura":
        return {
          tempo_fruizione: (Date.now() - start) / 1000,
          percentuale: fruition,
        };
      case "interazione":
        return {
          tempo_fruizione: (Date.now() - start) / 1000,
        };
      default:
        return null;
    }
  };

  const saveBehaviourPoi = (type) => {
    let behaviour = {
      organisation: parseInt(process.env.REACT_APP_ORG),
      visitatore: visitor,
      tipologia: type,
      sezione: state.statSection,
      oggetto: poiSelected.statLabel,
      misure: getMeasures(type),
    };
    behaviorService.createBehaviour(behaviour).then(() => {
      setFruition(0);
      setStart(0);
    });
  };

  const saveBehaviourLab = () => {
    let behaviour = {
      organisation: parseInt(process.env.REACT_APP_ORG),
      visitatore: visitor,
      tipologia: "click",
      sezione: state.statSection,
      oggetto: labSelected.statLabel,
      misure: null,
    };
    behaviorService.createBehaviour(behaviour);
  };

  const setTitle = () => {
    switch (state.number) {
      case 0:
        return <p style={styles.title}></p>;
      case 1:
        return (
          <div style={styles.composedTitle}>
            <div style={styles.titleImgContainer}>
              <img
                alt="room"
                src={theme === "light" ? room1_light : room1_dark}
                style={styles.titleImg}
              />
            </div>
            <div style={styles.labelInComposedTitle}>
              <p style={{ margin: 0 }}>{t("room" + state.number)}</p>
              <p style={{ margin: 0 }}>{t("room" + state.number + "_sub")}</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div style={styles.composedTitle}>
            <div style={styles.titleImgContainer}>
              <img
                alt="room"
                src={theme === "light" ? room2_light : room2_dark}
                style={styles.titleImg}
              />
            </div>
            <div style={styles.labelInComposedTitle}>
              <p style={{ margin: 0 }}>{t("room" + state.number)}</p>
              <p style={{ margin: 0 }}>{t("room" + state.number + "_sub")}</p>
            </div>
          </div>
        );
      case 3:
      case 4:
      case 5:
        return <p style={styles.title}>{t("room" + state.number)}</p>;
      default:
        return;
    }
  };

  useEffect(() => {
    if (!!state) {
      if (state.number === 2) {
        setLabs(state.config);
      } else {
        setPoi(state.config);
      }
    }
  }, [state]);

  useEffect(() => {
    if (!!poiSelected && prevPoiSelected?.id !== poiSelected.id) {
      saveBehaviourPoi("click");
    }
    // eslint-disable-next-line
  }, [poiSelected, prevPoiSelected]);

  useEffect(() => {
    if (!!labSelected && prevLabSelected?.id !== labSelected.id) {
      saveBehaviourLab();
    }
    // eslint-disable-next-line
  }, [labSelected, prevLabSelected]);

  const styles = {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundColor:
        contentSelected && contentSelected !== "audio"
          ? colors?.contentbackground
          : colors?.mainbackground,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "background .8s",
    },
    subcontainer: {
      width: "90%",
      height: "100%",
      flexDirection: "column",
      backgroundColor: "transparent",
      display: "flex",
      justifyContent: "space-evenly",
    },
    logo: {
      width: "40%",
    },
    bodyContainer: {
      display: "flex",
      flexDirection: "column",
      height: "90%",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    composedTitle: {
      marginTop: 20,
      marginBottom: 20,
      display: "flex",
      flexDirection: "row",
    },
    titleImgContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    titleImg: {
      width: 75,
      marginRight: 20,
    },
    labelInComposedTitle: {
      fontWeight: 700,
      fontSize: 35,
      color: colors.title,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    title: {
      marginTop: 50,
      marginBottom: 30,
      fontWeight: 700,
      fontSize: 35,
      color: colors.title,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.subcontainer}>
        <MenuBar
          contentSelected={contentSelected}
          setContentSelected={setContentSelected}
        />
        <div style={styles.bodyContainer}>
          {(!contentSelected || contentSelected === "audio") && (
            <>
              {setTitle()}
              {state.number === 2 ? (
                labs.length !== 0 && (
                  <LabsComponent
                    labs={labs}
                    labSelected={labSelected}
                    setLabSelected={setLabSelected}
                  />
                )
              ) : (
                <Map
                  poi={poi}
                  poiSelected={poiSelected}
                  setPoiSelected={(id) => {
                    setPoiSelected(findPoiFromID(id));
                  }}
                  number={state.number}
                />
              )}
              <ContentBar
                section={state.section}
                statSection={state.statSection}
                content={state.number === 2 ? labSelected : poiSelected}
                contentSelected={contentSelected}
                setContentSelected={setContentSelected}
              />
            </>
          )}
          {contentSelected === "text" && (
            <BodyComponent
              title={poiSelected?.title}
              body={
                <TextComponent
                  content={poiSelected}
                  setStart={setStart}
                  setFruition={setFruition}
                />
              }
              content={poiSelected}
              setContentSelected={setContentSelected}
              onClose={() => saveBehaviourPoi("lettura")}
            />
          )}
          {contentSelected === "qrcode" && (
            <BodyComponent
              title={t("frameqrcode")}
              body={
                <QRCodeComponent content={poiSelected} setStart={setStart} />
              }
              content={poiSelected}
              setContentSelected={setContentSelected}
              onClose={() => !!start && saveBehaviourPoi("interazione")}
            />
          )}
          {contentSelected === "glossary" && (
            <BodyComponent
              title={t("glossary")}
              body={<GlossaryComponent content={state.glossary} />}
              content={poiSelected}
              setContentSelected={setContentSelected}
            />
          )}
          {contentSelected === "info" && (
            <BodyComponent
              title={t("info")}
              body={<InfoComponent content={state.info} />}
              content={poiSelected}
              setContentSelected={setContentSelected}
            />
          )}
          {contentSelected === "settings" && (
            <BodyComponent
              title={t("settings")}
              body={<SettingsComponent />}
              content={poiSelected}
              setContentSelected={setContentSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;
