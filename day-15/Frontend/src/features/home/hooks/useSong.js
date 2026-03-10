import { useContext } from "react";
import { Songcontext } from "../contexts/song.context";
import { uploadsong } from "../services/song.api";

const useSong = () => {
  const context = useContext(Songcontext);
  const { song, setsong, loading, setloading } = context;

  const handlesong = async ({ mood }) => {
    try {
      setloading(true);

      const data = await uploadsong({ mood });
      console.log("API DATA:", data);

      if (data?.songs) {
        setsong(data.songs);
      }

    } catch (error) {
      console.log("Song fetch error:", error);
    } finally {
      setloading(false);
    }
  };

  return { song, setsong, loading, setloading, handlesong };
};

export default useSong;