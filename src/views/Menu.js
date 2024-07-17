import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import back from "./../assets/img/back.png";
import logo from "./../assets/img/logo.png";
import line from "./../assets/img/line.png";
import i18next, { t } from "i18next";
import ContentBar from "../components/ContentBar";
import MenuChoice from "../components/MenuChoice";
import PoiMenuComponent from "../components/PoiMenuComponent";
import { getBucketObject } from "../util/bucketUtils";
import { ThemeContext, VisitorContext } from "../contexts";
import { visitorService } from "../services";
import { behaviorService } from "../services";

function getLanguage(label) {
  switch (label) {
    case "italiano":
      return "it";
    case "english":
      return "en";
    default:
      return "it";
  }
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

async function load(setConfig) {
  getBucketObject(getLanguage(i18next.language) + "/config.json")
    .then(async (out) => {
      let parsed = JSON.parse(out.toString());
      setConfig(parsed);
    })
    .catch((error) => {
      console.error("Error retrieving object:", error);
    });
}

const Menu = () => {
  const colors = useContext(ThemeContext)?.colors;
  const visitor = useContext(VisitorContext)?.visitor;
  const infoVisitor = useContext(VisitorContext)?.infoVisitor;
  const prevInfoVisitor = usePrevious(infoVisitor);
  const setVisitor = useContext(VisitorContext)?.setVisitor;

  const [config, setConfig] = useState(null);

  const [poiSelected, setPoiSelected] = useState(null);
  const prevPoiSelected = usePrevious(poiSelected);

  const [contentSelected, setContentSelected] = useState(null);
  const [fruition, setFruition] = useState(0);
  const [start, setStart] = useState(0);

  const [introConfig, setIntroConfig] = useState([]);

  const findPoiFromID = (id) => {
    return introConfig.find((obj) => obj.id === id);
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

  const saveBehaviour = (type) => {
    let behaviour = {
      organisation: parseInt(process.env.REACT_APP_ORG),
      visitatore: visitor,
      tipologia: type,
      sezione: "Menu",
      oggetto: poiSelected.statLabel,
      misure: getMeasures(type),
    };
    behaviorService.createBehaviour(behaviour).then(() => {
      setFruition(0);
      setStart(0);
    });
  };

  useEffect(() => {
    if (!!config) {
      setIntroConfig(config["menu"]);
    }
  }, [config]);

  useEffect(() => {
    if (!!poiSelected && prevPoiSelected?.id !== poiSelected.id) {
      saveBehaviour("click");
    }
    // eslint-disable-next-line
  }, [poiSelected, prevPoiSelected]);

  const styles = {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundColor: colors?.menuBackground,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
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
    selectionContainer: {
      width: "100%",
      flex: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "opacity 1.5s",
    },
    title: {
      marginTop: 20,
      //fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
      fontSize: 30,
      color: "white",
    },
    logo: {
      width: 200,
    },
    logoContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    line: {
      width: "70%",
      marginTop: 25,
      marginBottom: 25,
    },
    choicesContainer: {
      minHeight: "50%",
      display: "grid",
      columnGap: 10,
      rowGap: 10,
      gridTemplateColumns: "auto auto auto",
      alignContent: "center",
      padding: 10,
    },
  };

  useEffect(() => {
    const updateInfoVisitor = (additional_info) => {
      let gender = additional_info.find((field) => field.name === "Genere");
      gender.value = infoVisitor.genere;
      let city = additional_info.find((field) => field.name === "Città");
      city.value = infoVisitor.comune;
      let birthyear = additional_info.find(
        (field) => field.name === "Anno di nascita"
      );
      birthyear.value = new Date(infoVisitor.data_nascita).getFullYear();
    };

    if (visitor === null) {
      visitorService.getConfig().then((config) => {
        let visitorObj = {};
        let additional_info = config[0].biglietteria;
        let language = additional_info?.find(
          (field) => field.name === "Lingua"
        );
        language.value =
          i18next.language[0].toUpperCase() + i18next.language.substring(1);
        if (!!infoVisitor) {
          updateInfoVisitor(additional_info);
        }
        visitorObj.additional_info = additional_info;
        visitorService.createVisitor(visitorObj).then((response) => {
          if (response !== false) {
            setVisitor(response);
            visitorService.updateVisitor(
              { codice_biglietto: "nocode-" + response.id },
              response.id
            );
          }
        });
      });
    } else if (!!infoVisitor && prevInfoVisitor !== infoVisitor) {
      let visitorObj = JSON.parse(JSON.stringify(visitor));
      updateInfoVisitor(visitorObj.additional_info);
      visitorService
        .updateVisitor(visitorObj, visitorObj.id)
        .then((response) => {
          if (response !== false) {
            setVisitor(response);
          }
        });
    }
  }, [visitor, infoVisitor, prevInfoVisitor, setVisitor]);

  useEffect(() => {
    if (!!i18next.language) {
      let funct = async () => {
        await load(setConfig);
      };
      funct();
    }
  }, []);

  return (
    <div style={styles.container}>
      <Link to="/tutorial" style={styles.backContainer}>
        <img alt="Back" src={back} style={styles.back} />
      </Link>
      <div style={styles.logoContainer}>
        <img alt="Logo" src={logo} style={styles.logo} />
      </div>

      <div style={styles.selectionContainer}>
        <img alt="Line" src={line} style={styles.line} />
        <p style={styles.title}>{t("menuTitle")}</p>
        <div style={styles.choicesContainer}>
          {config?.menu.map((object, key) => {
            return object.audio !== undefined ? (
              <PoiMenuComponent
                key={key}
                id={object.id}
                poi={object}
                poiSelected={poiSelected}
                setPoiSelected={(id) => {
                  setPoiSelected(findPoiFromID(id));
                }}
                label={object.label}
              />
            ) : (
              <MenuChoice
                key={key}
                id={object.id}
                path={object.path}
                label={object.label}
                statLabel={object.statLabel}
                config={config[object.config]}
                glossary={config.glossary}
                info={config.info}
              />
            );
          })}
        </div>
        {(!contentSelected || contentSelected === "audio") && (
          <ContentBar
            section={"Menu"}
            statSection={"Menu"}
            content={poiSelected}
            contentSelected={contentSelected}
            setContentSelected={setContentSelected}
          />
        )}
        <img alt="Line" src={line} style={styles.line} />
      </div>
    </div>
  );
};

export default Menu;
