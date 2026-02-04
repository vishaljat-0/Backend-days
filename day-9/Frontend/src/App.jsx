import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [note, setnote] = useState([]);
  const [showtitle, setshowTitle] = useState();
  const [showdescription, setshowDescription] = useState();
  const [id, setId] = useState("");

  const apicall = async () => {
    const response = await axios.get("https://backend-days.onrender.com/api/notes");
    console.log(response.data.data);
    setnote(response.data.data);
  };

  const formhandler = (e) => {

    e.preventDefault();

    if (id) {
       const cleanId = id.trim();
       
      axios
        .patch(`https://backend-days.onrender.com/api/notes/${cleanId}`, {
          // title: showtitle,
          description: showdescription,
        })
        .then((response) => {
          console.log(response);
          apicall();
             setshowTitle("");
      setshowDescription("");
      setId("");

        }).catch((err) => {
          console.log(err);
        });
        
    } else {
      axios
        .post("https://backend-days.onrender.com/api/notes", {
          title: showtitle,
          description: showdescription,
        })
        .then((response) => {
          console.log(response);
          apicall();
          setshowTitle("");
          setshowDescription("");
          setId("");
        }); 
    }
   
  };

  let handledelete = (id) => {
    axios.delete("https://backend-days.onrender.com/api/notes/" + id).then((response) => {
      console.log(response);
      apicall();
    });
    console.log(id);
  };
  useEffect(() => {
    apicall();
  }, []);

  let updatehandler = (note) => {
  setshowTitle(note.title);
  setshowDescription(note.description);
  setId(note._id);
};
  return (
    <div>
      <form onSubmit={formhandler}>
        <input
          type="text"
          value={showtitle || ""}
          onChange={(e) => setshowTitle(e.target.value)}
          name="title"
          placeholder="Write title here "
        />
        <input
          value={showdescription || ""}
          onChange={(e) => setshowDescription(e.target.value)}
          type="text"
          name="description"
          placeholder=" write description here   "
        />
        <button type="submit">{id?"Update":"Create"}</button>
      </form>

      <div className="task">
        {note.map((value, index) => {
          return (
            <div className="task1" key={index}>
              <h2>{value.title}</h2>
              <p>{value.description}</p>
              <button onClick={() => updatehandler(value)}>Update</button>
              <button onClick={() => handledelete(value._id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
