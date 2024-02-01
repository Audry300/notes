import React, { createContext, useState, useEffect } from "react";

import { updateData, saveData, readData, getAllKeys } from "./asyncStorage";

const dataContext = createContext();

export const ContextProvider = ({ children }) => {
  const [keys, setKeys] = useState([]);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const keys = await getAllKeys();
        setKeys(keys);

        const dataPromises = keys.map(async (key) => {
          const data = await readData(key);
          return { key, ...data };
        });

        const data = await Promise.all(dataPromises);
        setNotes(data);
      } catch (e) {
        console.error("Error fetching data", e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updateStore = async () => {
      if (keys.length < notes.length) {
        // this means that a new note has been added, it will be the last one from the data context array

        const { key, title, text } = notes[notes.length - 1];
        await saveData(key, { key, title, text });
        setKeys([...keys, key]);
      } else if (keys.length === notes.length) {
        // There has just been an update on a note

        const NoteToUpdate = notes.filter((note) => note.change !== undefined);

        if (NoteToUpdate[0]) {
          //if true, this is not the first render, which would result in an error
          const { key, title, text } = NoteToUpdate[0];

          await updateData(key, { key, title, text });
        }
      }
    };

    updateStore();
  }, [notes]);

  return (
    <dataContext.Provider value={{ notes, setNotes, keys, setKeys }}>
      {children}
    </dataContext.Provider>
  );
};

export default dataContext;
