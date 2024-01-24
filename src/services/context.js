import React, { createContext, useState } from "react";

const dataContext = createContext();

export const ContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  return (
    <dataContext.Provider value={{ notes, setNotes }}>
      {children}
    </dataContext.Provider>
  );
};

export default dataContext;
