import React, { createContext, useState, useMemo } from "react";
const VisitorContext = createContext();

const VisitorContextProvider = ({ children }) => {
  const [visitor, setVisitor] = useState(null);
  const [infoVisitor, setInfoVisitor] = useState(null);

  // memoize the full context value
  const contextValue = useMemo(
    () => ({
      visitor,
      setVisitor,
      infoVisitor,
      setInfoVisitor,
    }),
    [visitor, infoVisitor, setVisitor, setInfoVisitor]
  );

  return (
    // the Provider gives access to the context to its children
    <VisitorContext.Provider value={contextValue}>
      {children}
    </VisitorContext.Provider>
  );
};

export { VisitorContext, VisitorContextProvider };
