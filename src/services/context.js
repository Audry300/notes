import React, { createContext, useState } from "react";

const dataContext = createContext();

export const ContextProvider = ({ children }) => {
  const data = [
    { title: "Title 1", text: "Lorem Ipsum" },
    { title: "Title 2", text: "Lorem Ipsum 2" },
  ];

  const [notes, setNotes] = useState(data);

  return (
    <dataContext.Provider value={{ notes, setNotes }}>
      {children}
    </dataContext.Provider>
  );
};

export default dataContext;
