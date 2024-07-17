import i18next from "i18next";
import React, { useState, useEffect, useContext } from "react";
import audio from "../assets/img/audio.png";
import audiostop from "../assets/img/audiostop.png";
import audiopause from "../assets/img/audiopause.png";
import audiodark from "../assets/img/audiodark.png";
import audiostopdark from "../assets/img/audiostopdark.png";
import audiopausedark from "../assets/img/audiopausedark.png";
import audiomenu from "../assets/img/audiomenu.png";
import audiostopmenu from "../assets/img/audiostopmenu.png";
import audiopausemenu from "../assets/img/audiopausemenu.png";
import { getBucketObject } from "../util/bucketUtils";
import { ThemeContext, VisitorContext } from "../contexts";
import { behaviorService } from "../services/behaviour.service";

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

const AudioContent = ({
  section,
  statSection,
  content,
  setContentSelected,
  setAudioPlaying,
}) => {
  const theme = useContext(ThemeContext)?.theme;
  const type = "ascolto";
  const visitor = useContext(VisitorContext)?.visitor;

  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [pause, setPause] = useState(false);

  const pickIcon = () => {
    if (playing) {
      if (section === "Menu") {
        return audiostopmenu;
      } else {
        if (theme === "dark") {
          return audiostopdark;
        } else {
          return audiostop;
        }
      }
    } else {
      if (section === "Menu") {
        return audiomenu;
      } else {
        if (theme === "dark") {
          return audiodark;
        } else {
          return audio;
        }
      }
    }
  };

  const pickPauseIcon = () => {
    if (section === "Menu") {
      return audiopausemenu;
    } else {
      if (theme === "dark") {
        return audiopausedark;
      } else {
        return audiopause;
      }
    }
  };

  const saveBehaviour = (currentTime, duration) => {
    let behaviour = {
      organisation: parseInt(process.env.REACT_APP_ORG),
      visitatore: visitor,
      tipologia: type,
      sezione: statSection,
      oggetto: content.statLabel,
      misure: {
        tempo_fruizione: currentTime,
        tempo_totale: duration,
        percentuale: (currentTime / duration) * 100,
      },
    };
    behaviorService.createBehaviour(behaviour);
  };

  useEffect(() => {
    setPlaying(false);
    setAudioPlaying(false);
    if (!!track) {
      if (track.currentTime !== 0) {
        saveBehaviour(track.currentTime, track.duration);
      }
      track.pause();
      track.currentTime = 0;
      setTrack(null);
    }

    setContentSelected(null);

    if (!!content) {
      const getAudio = async () => {
        const audioData = await getBucketObject(
          getLanguage(i18next.language) + "/audio/" + content.audio
        );
        const audioDataUrl = `data:audio/mp4;base64,${audioData.toString(
          "base64"
        )}`;
        const audio = new Audio(audioDataUrl);

        setTrack(audio);
      };

      getAudio();
    }
    // eslint-disable-next-line
  }, [content]);

  useEffect(() => {
    if (!!track) {
      track.addEventListener("ended", () => {
        setPlaying(false);
        setAudioPlaying(false);
      });
      return () => {
        track.removeEventListener("ended", () => {
          setPlaying(false);
          setAudioPlaying(false);
        });
      };
    }
  }, [track, setAudioPlaying]);

  useEffect(() => {
    return () => {
      if (!!track) {
        if (track.currentTime !== 0) {
          saveBehaviour(track.currentTime, track.duration);
        }
        track.pause();
        track.currentTime = 0;
      }
    };
    // eslint-disable-next-line
  }, [track]);

  useEffect(() => {
    if (!!track) {
      if (playing) {
        setContentSelected("audio");
        setPause(false);
        track.play();
      } else {
        //If PAUSE
        track.pause();
        setContentSelected(null);
        //If STOP
        if (pause === false) {
          if (track.currentTime !== 0) {
            saveBehaviour(track.currentTime, track.duration);
            track.currentTime = 0;
          }
        }
      }
    }
    // eslint-disable-next-line
  }, [playing, pause, track, setContentSelected]);

  const styles = {
    icon: {
      width: 120,
      margin: 20,
    },
  };
  return (
    <>
      <img
        alt="Audio content"
        src={pickIcon()}
        style={styles.icon}
        onClick={() => {
          setPlaying(!playing);
          setAudioPlaying(!playing);
        }}
      />
      {playing && (
        <img
          alt="Pause button"
          src={pickPauseIcon()}
          style={styles.icon}
          onClick={() => {
            setPause(true);
            setPlaying(false);
            setAudioPlaying(false);
          }}
        />
      )}
    </>
  );
};

export default AudioContent;
