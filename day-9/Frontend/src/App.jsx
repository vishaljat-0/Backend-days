import React from 'react'
import { useState } from 'react'
import axios from 'axios'

 const App = () => {
  const [note, setnote] = useState([
    {
    title:"titile one ",
    description:"this is description"
  }, {
    title:"titile one ",
    description:"this is description"
  }, {
    title:"titile one ",
    description:"this is description"
  }, {
    title:"titile one ",
    description:"this is description"
  }, {
    title:"titile one ",
    description:"this is description"
  }, {
    title:"titile one ",
    description:"this is description"
  }, {
    title:"titile one ",
    description:"this is description"
  },
  ])


  axios.get("http://localhost:3000/api/notes").then((res)=>{
    
    setnote(res.data.data)
  })
  return (
    <div>


      <div className="task">
        {
          note.map((value,index)=>{
            return(
              <div className="task1" key={index}>
                <h2>{value.title}</h2>
                <p>{value.description}</p>  
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default App