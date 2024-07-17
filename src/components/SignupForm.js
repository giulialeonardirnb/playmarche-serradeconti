import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import i18next, { t } from "i18next";
import PrimaryButton from "../components/PrimaryButton";
import Textinput from "../components/Textinput";
import ReactLoading from "react-loading";
import { ThemeContext, VisitorContext } from "../contexts";
import { visitorService } from "../services";
import { getBucketObject } from "../util/bucketUtils";

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

function downloadPdfFromUint8Array(uint8ArrayData, filename) {
  try {
    // Convert Uint8Array to Blob
    const blob = new Blob([uint8ArrayData], { type: "application/pdf" });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    // Append the link to the DOM and trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up by removing the link and revoking the Blob URL
    a.remove();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Error downloading PDF:", err);
  }
}

const SignupForm = () => {
  const colors = useContext(ThemeContext)?.colors;
  const navigate = useNavigate();
  const infoVisitor = useContext(VisitorContext)?.infoVisitor;
  const setInfoVisitor = useContext(VisitorContext)?.setInfoVisitor;

  const [name, setName] = useState(infoVisitor?.nome || "");
  const [surname, setSurname] = useState(infoVisitor?.cognome || "");
  const [email, setEmail] = useState(infoVisitor?.email || "");
  const [city, setCity] = useState(infoVisitor?.comune || "");
  const [age, setAge] = useState(
    infoVisitor && infoVisitor.data_nascita
      ? new Date().getFullYear() - infoVisitor?.data_nascita?.split("-")[0]
      : ""
  );
  const [privacyAck, setPrivacyAck] = useState(false);

  const genderList = [
    { value: "", label: t("genderLabel_Select") },
    { value: 1, label: t("genderLabel_Female") },
    { value: 2, label: t("genderLabel_Male") },
    { value: 3, label: t("genderLabel_Other") },
  ];

  const getGenderObj = (gender) => {
    switch (gender?.toUpperCase()) {
      case t("genderLabel_Female", { lng: "italiano" }).toUpperCase():
        return genderList[1];
      case t("genderLabel_Male", { lng: "italiano" }).toUpperCase():
        return genderList[2];
      case t("genderLabel_Other", { lng: "italiano" }).toUpperCase():
        return genderList[3];
      default:
        return genderList[0];
    }
  };
  const [gender, setGender] = useState(getGenderObj(infoVisitor?.genere));

  const [readyToBeSent, setReadyToBeSent] = useState(false);
  const [loader, setLoader] = useState(false);
  const [privacyLoader, setPrivacyLoader] = useState(false);
  const [isWarningActive, setIsWarningActive] = useState(false);

  async function load() {
    setPrivacyLoader(true);
    getBucketObject(getLanguage(i18next.language) + "/config.json")
      .then(async (out) => {
        let parsed = JSON.parse(out.toString());
        let url = getLanguage(i18next.language) + "/" + parsed.privacy;
        let pdfBucketData = await getBucketObject(url);
        downloadPdfFromUint8Array(pdfBucketData, `${parsed.privacy}`);
        setPrivacyLoader(false);
      })
      .catch((error) => {
        console.error("Error retrieving object:", error);
      });
  }

  const isEmpty = (value) => {
    if (value === null || value === undefined || value === "") {
      return true;
    } else {
      return false;
    }
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let error = re.test(String(email).toLowerCase());
    return error;
  };

  const allFieldsOk = () => {
    if (
      isEmpty(name) ||
      isEmpty(surname) ||
      isEmpty(email) ||
      !validateEmail(email) ||
      isEmpty(city) ||
      isEmpty(age) ||
      isEmpty(gender) ||
      !privacyAck ||
      gender.label === t("genderLabel_Select")
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (allFieldsOk()) {
      setReadyToBeSent(true);
    } else {
      setReadyToBeSent(false);
    }
    // eslint-disable-next-line
  }, [name, surname, email, city, age, gender, privacyAck]);

  const getBirthDateFromAge = (age) => {
    var today = new Date();
    return new Date(
      today.getMonth() +
        " " +
        today.getDate() +
        " " +
        (new Date().getFullYear() - parseInt(age)) +
        " 12:00:00"
    );
  };

  const createInfoVisitor = () => {
    setIsWarningActive(false);
    setLoader(true);
    var approxBornDate = getBirthDateFromAge(age);
    var tempGender =
      gender.label !== t("genderLabel_Male") &&
      gender.label !== t("genderLabel_Female")
        ? "altro"
        : gender.label;

    var params = {
      nome: name,
      cognome: surname,
      email: email,
      comune: city,
      data_nascita: approxBornDate,
      genere: tempGender,
    };

    visitorService
      .createInfoVisitor(params)
      .then((response) => {
        setLoader(false);
        if (response !== false) {
          setInfoVisitor(response);
          navigate("/tutorial");
        } else {
          setIsWarningActive(true);
        }
      })
      .catch((errors) => {
        if (errors.statusCode === 401 || errors.statusCode === 403) {
          setIsWarningActive(true);
        }
      });
  };

  const updateInfoVisitor = () => {
    setIsWarningActive(false);
    setLoader(true);
    var approxBornDate = getBirthDateFromAge(age);
    var tempGender =
      gender.label !== t("genderLabel_Male") &&
      gender.label !== t("genderLabel_Female")
        ? "altro"
        : gender.label;

    var params = {
      nome: name,
      cognome: surname,
      email: email,
      comune: city,
      data_nascita: approxBornDate,
      genere: tempGender,
    };

    visitorService
      .updateInfoVisitor(params, infoVisitor?.id)
      .then((response) => {
        setLoader(false);
        if (response !== false) {
          setInfoVisitor(response);
          navigate("/tutorial");
        } else {
          setIsWarningActive(true);
        }
      })
      .catch((errors) => {
        if (errors.statusCode === 401 || errors.statusCode === 403) {
          setIsWarningActive(true);
        }
      });
  };

  const styles = {
    inputsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
    textInputContainer: {
      marginTop: 10,
      marginBottom: 10,
      width: "50%",
    },
    continueButtonContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      opacity: readyToBeSent ? "100%" : "60%",
      marginBottom: 20,
    },
    selectContainer: {
      width: "60%",
      height: 70,
      borderRadius: 100,
      padding: "0px 40px",
      borderColor: colors?.white,
      outline: 0,
      border: "2px solid #ffffff",
      background: "transparent",
      fontFamily: '"Montserrat", sans-serif',
      fontSize: "20px",
      fontWeight: 700,
      color: "white",
    },
    twoInputs: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "50%",
    },
    privacyContainer: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      marginTop: 20,
      marginBottom: 20,
    },
    privacyButtonContainer: {
      display: "flex",
      justifyContent: "center",
      textAlign: "left",
      width: "70%",
    },
    privacyText: {
      marginLeft: 10,
      width: "85%",
      background: "transparent",
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
      fontSize: 15,
      textDecoration: "none",
      color: "white",
      outline: 0,
      border: "none",
    },
    privacyButton: {
      background: "transparent",
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
      fontStyle: "italic",
      fontSize: 15,
      textDecoration: "underline",
      color: "white",
      outline: 0,
      border: "none",
      margin: "0px -5px",
    },
    warning: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
      fontSize: 15,
      color: colors?.primary,
    },
  };

  return (
    <div style={styles.inputsContainer}>
      <div style={styles.textInputContainer}>
        <Textinput value={name} setValue={setName} label={t("nameLabel")} />
      </div>
      <div style={styles.textInputContainer}>
        <Textinput
          value={surname}
          setValue={setSurname}
          label={t("surnameLabel")}
        />
      </div>
      <div style={styles.textInputContainer}>
        <Textinput
          value={email}
          setValue={setEmail}
          label={t("emailLabel")}
          emailParsing={true}
        />
      </div>
      <div style={styles.textInputContainer}>
        <Textinput value={city} setValue={setCity} label={t("cityLabel")} />
      </div>

      <div style={styles.twoInputs}>
        <div
          style={{
            ...styles.textInputContainer,
            width: "50%",
            marginRight: 10,
          }}
        >
          <Textinput
            value={age}
            setValue={setAge}
            style={{ width: "150px" }}
            label={t("ageLabel")}
            ageParsing={true}
          />
        </div>
        <select
          name="gender"
          value={gender.value}
          style={styles.selectContainer}
          onChange={(event) => {
            setGender(genderList[event.target.selectedIndex]);
          }}
        >
          {genderList.map((item, key) => {
            return (
              <option key={key} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      </div>

      <div style={styles.privacyContainer}>
        {privacyLoader ? (
          <ReactLoading
            type={"spinningBubbles"}
            color={colors.white}
            height={50}
            width={50}
          />
        ) : (
          <div style={styles.privacyButtonContainer}>
            <input
              type="checkbox"
              checked={privacyAck}
              onChange={(event) => setPrivacyAck(!privacyAck)}
              style={{ width: 20, marginRight: 5 }}
            />
            <p style={styles.privacyText}>
              {t("privacyLabel1")}
              <button
                style={styles.privacyButton}
                onClick={() => {
                  load();
                }}
              >
                {t("privacyLabel2")}
              </button>
              {t("privacyLabel3")}
            </p>
          </div>
        )}
      </div>

      <div style={styles.continueButtonContainer}>
        {loader ? (
          <ReactLoading
            type={"spinningBubbles"}
            color={colors.primary}
            height={50}
            width={50}
          />
        ) : (
          <PrimaryButton
            label={!!infoVisitor ? t("update") : t("goOn")}
            bgColor={colors?.primary}
            txtColor={colors?.white}
            onClick={() => {
              if (allFieldsOk()) {
                infoVisitor ? updateInfoVisitor() : createInfoVisitor();
              }
            }}
          />
        )}
      </div>

      {isWarningActive && (
        <div style={styles.warning}>
          <p style={{ margin: "0px 0px 20px 0px" }}>
            {t("registrationWarning")}
          </p>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
