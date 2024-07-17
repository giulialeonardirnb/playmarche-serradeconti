import { React, useContext } from "react";
import PoiComponent from "./PoiComponent";
import { ThemeContext } from "../contexts";

const roomsConfig = [
  {
    id: 0,
    type: "room",
    configCenter: [[{ id: 1, label: ["Intro"] }]],
  },
  {
    id: 1,
    type: "room",
    configLeft: [
      [{ id: 1, label: ["1"] }],
      [{ id: 3, label: ["3"] }],
      [{ id: 5, label: ["5"] }],
      [{ id: 7, label: ["7"] }],
      [{ id: 9, label: ["9"] }],
      [{ id: 11, label: ["11"] }],
    ],
    configRight: [
      [{ id: 2, label: ["2"] }],
      [{ id: 4, label: ["4"] }],
      [{ id: 6, label: ["6"] }],
      [{ id: 8, label: ["8"] }],
      [{ id: 10, label: ["10"] }],
      [{ id: 12, label: ["12"] }],
    ],
  },
  {
    id: 2,
    type: "lab",
  },
  {
    id: 3,
    type: "room",
    configLeft: [[{ id: 1, label: ["1"] }]],
    configRight: [[{ id: 2, label: ["2"] }]],
  },
  {
    id: 4,
    type: "room",
    configLeft: [
      [{ id: 1, label: ["1"] }],
      [{ id: 3, label: ["3"] }],
      [{ id: 5, label: ["5"] }],
      [{ id: 7, label: ["7"] }],
    ],
    configRight: [
      [{ id: 2, label: ["2"] }],
      [{ id: 4, label: ["4"] }],
      [{ id: 6, label: ["6"] }],
    ],
  },
  {
    id: 5,
    type: "room",
    configLeft: [
      [{ id: 1, label: ["1"] }],
      [{ id: 4, label: ["4"] }],
      [{ id: 7, label: ["7"] }],
    ],
    configCenter: [
      [{ id: 2, label: ["2"] }],
      [{ id: 5, label: ["5"] }],
      [{ id: 8, label: ["8"] }],
    ],
    configRight: [
      [{ id: 3, label: ["3"] }],
      [{ id: 6, label: ["6"] }],
      [{ id: 9, label: ["9"] }],
    ],
  },
];

const Map = ({ poiSelected, setPoiSelected, number }) => {
  const colors = useContext(ThemeContext)?.colors;
  const currentRoomConfig = roomsConfig.find((x) => x.id === number);

  const showMap = () => {
    if (currentRoomConfig.type === "room") {
      if (currentRoomConfig.id === 5) {
        return showRoom5();
      } else {
        return showRoom();
      }
    } else {
      console.log("Error"); //
    }
  };

  const showRoom = () => {
    return (
      <>
        <div style={{ ...styles.poiContainer, marginRight: 50 }}>
          {currentRoomConfig.configLeft.map((row, key) => {
            return (
              <div
                key={key}
                style={{ ...styles.row, justifyContent: "flex-end" }}
              >
                {row.map((poi, key) => {
                  return (
                    <PoiComponent
                      key={key}
                      poi={poi}
                      side={"left"}
                      poiSelected={poiSelected}
                      setPoiSelected={setPoiSelected}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div style={{ ...styles.poiContainer, marginLeft: 50 }}>
          {currentRoomConfig.configRight.map((row, key) => {
            return (
              <div
                key={key}
                style={{ ...styles.row, justifyContent: "flex-start" }}
              >
                {row.map((poi, key) => {
                  return (
                    <PoiComponent
                      key={key}
                      poi={poi}
                      side={"right"}
                      poiSelected={poiSelected}
                      setPoiSelected={setPoiSelected}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const showRoom5 = () => {
    return (
      <>
        <div style={{ ...styles.poiContainer, marginRight: 40 }}>
          {currentRoomConfig.configLeft.map((row, key) => {
            return (
              <div
                key={key}
                style={{ ...styles.row, justifyContent: "flex-end" }}
              >
                {row.map((poi, key) => {
                  return (
                    <PoiComponent
                      key={key}
                      poi={poi}
                      side={"left"}
                      poiSelected={poiSelected}
                      setPoiSelected={setPoiSelected}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div
          style={{ ...styles.poiContainer, marginRight: 40, marginLeft: 40 }}
        >
          {currentRoomConfig.configCenter.map((row, key) => {
            return (
              <div
                key={key}
                style={{ ...styles.row, justifyContent: "center" }}
              >
                {row.map((poi, key) => {
                  return (
                    <PoiComponent
                      key={key}
                      poi={poi}
                      side={"center"}
                      poiSelected={poiSelected}
                      setPoiSelected={setPoiSelected}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div style={{ ...styles.poiContainer, marginLeft: 40 }}>
          {currentRoomConfig.configRight.map((row, key) => {
            return (
              <div
                key={key}
                style={{ ...styles.row, justifyContent: "flex-start" }}
              >
                {row.map((poi, key) => {
                  return (
                    <PoiComponent
                      key={key}
                      poi={poi}
                      side={"right"}
                      poiSelected={poiSelected}
                      setPoiSelected={setPoiSelected}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const styles = {
    container: {
      backgroundColor: colors?.quaternary,
      width: "80%",
      height: "75%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBlock: 20,
      borderRadius: 15,
    },
    poiContainer: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      height: "90%",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      flex: 1,
      width: "100%",
      alignItems: "center",
    },
  };
  return <div style={styles.container}>{showMap()}</div>;
};

export default Map;
