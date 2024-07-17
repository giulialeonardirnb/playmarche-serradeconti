import React, { useEffect, useRef, useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import Iframe from "react-iframe";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const QRCodeComponent = ({ setStart }) => {
  const [qrResult, setQrResult] = useState(null);
  const prevQrResult = usePrevious(qrResult);

  const styles = {
    container: {
      width: "100%",
      height: "100%",
      overview: "scroll",
      flexDirection: "column",
      display: "flex",
      alignItems: "center",
      borderRadius: 50,
      position: "relative",
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: "height .8s ease-in-out",
    },
    qrBox: {
      width: "50%",
      height: "70%",
      marginTop: 30,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    iframe: {
      width: "100%",
      height: "100%",
      border: "none",
      display: "block",
      position: "relative",
    },
  };

  useEffect(() => {
    if (!!qrResult && qrResult !== prevQrResult) {
      setStart(Date.now());
    }
  }, [qrResult, prevQrResult, setStart]);

  return (
    <div style={styles.container}>
      {!!qrResult ? (
        <Iframe url={qrResult} styles={styles.iframe} />
      ) : (
        <div style={styles.qrBox}>
          <QrScanner
            onDecode={(result) => {
              setQrResult(result);
            }}
            onError={(error) => console.log(error?.message)}
          />
        </div>
      )}
    </div>
  );
};

export default QRCodeComponent;
