import { React, useEffect, useState } from "react";

function isEmpty(value) {
  return value !== "";
}
const Textinput = ({ value, setValue, label, emailParsing, ageParsing }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isEmpty(value)) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [value]);

  return (
    <div id="float-label">
      <input
        value={value}
        style={{ borderRadius: 50, fontSize: 40 }}
        inputMode={ageParsing ? "number" : "email"}
        onChange={(e) =>
          emailParsing
            ? setValue(e.target.value.toLowerCase())
            : setValue(e.target.value)
        }
      />
      <label className={isActive ? "Active" : ""}>{label}</label>
    </div>
  );
};

export default Textinput;
