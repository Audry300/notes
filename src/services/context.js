import React, { createContext, useState, useEffect } from "react";

import { updateData, saveData, readData, getAllKeys } from "./asyncStorage";

const dataContext = createContext();

export const ContextProvider = ({ children }) => {
  const [keys, setKeys] = useState([]);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const initializeData = async () => {
      const data = [
        { title: "Title 1", text: "Lorem Ipsum" },
        { title: "Title 2", text: "Lorem Ipsum 2" },
      ];
      try {
        await saveData("key-1", data[0]);
        await saveData("key-2", data[1]);
      } catch (e) {
        console.error("error while initializing the data", e);
      }
    };

    const fetchData = async () => {
      try {
        const keys = await getAllKeys();
        console.log;
        setKeys(keys);

        const data = await Promise.all(keys.map((key) => readData(key)));
        setNotes(data);
      } catch (e) {
        console.error("Error fetching data", e);
      }
    };
    //initializeData();
    fetchData();
  }, []);

  useEffect(() => {
    const updateStore = async () => {
      if (keys.length !== notes.length) {
        // this means that a new note has been added, it will be the last one from the data context array
        console.log(keys.length, notes.length);
        const { key, title, text } = notes[notes.length - 1];
        await saveData(key, { title, text });
        setKeys([...keys, key]);
      } else {
        // There has just been an update on a note

        const NoteToUpdate = notes.filter((note) => note.change !== undefined);

        if (NoteToUpdate[0]) {
          //if true, this is not the first render, which would result in an error
          const { key, title, text } = NoteToUpdate[0];
          console.log(NoteToUpdate);
          await updateData(key, { title, text });
        }
      }
    };

    updateStore();
  }, [notes]);

  return (
    <dataContext.Provider value={{ notes, setNotes }}>
      {children}
    </dataContext.Provider>
  );
};

export default dataContext;
