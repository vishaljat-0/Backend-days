import { useState } from "react";
import { createContext } from "react";
const Songcontext = createContext();

const SongProvider = ({ children }) => {
  const [song, setsong] = useState({});

  const [loading, setloading] = useState(false);

  return <Songcontext.Provider value={{ song, setsong, loading, setloading }}>{children}</Songcontext.Provider>;
};

export { Songcontext, SongProvider };
