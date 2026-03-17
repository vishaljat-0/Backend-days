import React from 'react'
// import { initializesocket } from '../service/chat.socket'
import { useEffect } from 'react'
import {useSocket} from '../hook/socket.hook'

function Dashboard() {

  const initializesocket = useSocket();
  useEffect(()=>{
     const socket = initializesocket();
    console.log("connected:", socket.id);
  },[])
  return (
    <div>this is dashbaord</div>
  )
}

export default Dashboard