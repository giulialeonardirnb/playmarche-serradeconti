import { React, useEffect, useState, useContext } from "react";
import i18next from "i18next";
import { getBucketObject } from "../util/bucketUtils";
import { ThemeContext } from "../contexts";

async function load(labs, setIsLoading, setIconsSrcConfig) {
  let url = getLanguage(i18next.language) + "/icon/";
  let iconsMap = await labs?.reduce(async (accPromise, choice) => {
    let acc = await accPromise;
    let iconBucketData = await getBucketObject(
      getLanguage(i18next.language) + "/icon/" + choice.icon
    );
    const imageElement = document.createElement("img");
    imageElement.src = `data:image/png;base64,${iconBucketData.toString(
      "base64"
    )}`;

    let iconSelBucketData = await getBucketObject(
      getLanguage(i18next.language) + "/icon/" + choice.iconselected
    );
    const imageSelElement = document.createElement("img");
    imageSelElement.src = `data:image/png;base64,${iconSelBucketData.toString(
      "base64"
    )}`;
    return Object.assign(acc, {
      [url + choice.icon]: imageElement.src,
      [url + choice.iconselected]: imageSelElement.src,
    });
  }, Promise.resolve({}));

  cacheImages(Object.values(iconsMap), setIsLoading);
  let newIconConfig = { ...iconsMap };
  setIconsSrcConfig(newIconConfig);
}

async function cacheImages(srcArray, setIsLoading) {
  const promises = await srcArray.map((src) => {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      img.src = src;
      img.onload = resolve();
      img.onerror = reject();
    });
  });
  await Promise.all(promises);
  setIsLoading(false);
}

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

const LabsComponent = (props) => {
  const colors = useContext(ThemeContext)?.colors;

  const [iconsSrcConfig, setIconsSrcConfig] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showIcons, setShowIcons] = useState(false);

  const [tempLabs, setTempLabs] = useState([]);

  let iconUrl = getLanguage(i18next.language) + "/icon/";

  useEffect(() => {
    if (isLoading === false) {
      setTimeout(() => {
        setShowIcons(true);
      }, 50);
    }
  }, [isLoading]);

  const styles = {
    container: {
      backgroundColor: colors?.quaternary,
      width: "80%",
      height: "75%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "opacity 1.5s",
      opacity: !showIcons ? 0 : 1,
      marginTop: 20,
      marginBottom: 20,
      borderRadius: 15,
    },
    labsGrid: {
      display: "grid",
      gridTemplateColumns: "auto auto auto",
      rowGap: "10px",
      columnGap: "10px",
      padding: "5px",
    },
    labButton: {
      width: 160,
      height: 160,
      margin: 5,
      borderRadius: 20,
      padding: 20,
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "column",
      alignItems: "center",
      border: "none",
    },
    text: {
      color: colors.white,
      display: "flex",
      alignItems: "center",
      margin: 0,
      fontWeight: "bold",
      fontSize: 18,
      marginBottom: 20,
    },
    icon: {
      height: 50,
    },
  };

  useEffect(() => {
    if (!!i18next.language) {
      let funct = async () => {
        await load(props.labs, setIsLoading, setIconsSrcConfig);
      };
      funct();
    }

    // custom hardcoded grid formation:
    var tempA = [];
    for (var i = 0; i < 12; i++) {
      // eslint-disable-next-line
      if (props.labs.find((x) => x.id === i) !== undefined) {
        // eslint-disable-next-line
        tempA.push(props.labs.find((x) => x.id === i));
      } else {
        tempA.push({ id: i, label: "" });
      }
    }
    setTempLabs(tempA);
  }, [props.labs]);

  return (
    <div style={styles.container}>
      <div style={styles.labsGrid}>
        {tempLabs.map((label, key) => {
          return label.label === "" ? (
            <div key={key}></div>
          ) : (
            <button
              key={key}
              style={{
                ...styles.labButton,
                backgroundColor:
                  label === props.labSelected
                    ? colors.highlight
                    : colors.secondary,
              }}
              onClick={() => {
                props.setLabSelected(label);
              }}
            >
              <div>
                <p style={styles.text}>{label.title.toUpperCase()}</p>
              </div>
              <div>
                <img
                  alt="icon"
                  style={styles.icon}
                  src={iconsSrcConfig[iconUrl + label.iconselected]}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LabsComponent;
