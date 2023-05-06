
import React from "react";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
// import logo from './logo.svg';
  // import './App.css';
import {
   Dashboard,
  Home,
  // Loader,
  Login,
  Music,
  MusicPlayer,
  // MusicPlayer,
  // UserProfile,
} from "./components";
import { useState,useEffect } from "react";

import {
  getAuth,
 
} from "firebase/auth";

import { app } from "./config/firebase.config";
import { motion, AnimatePresence } from "framer-motion";
import { getAllSongs, validateUser } from "./api";
import { useStateValue } from "./Context/StateProvider";
import { actionType } from "./Context/reducer";
import { isActiveStyles, isNotActiveStyles } from "./utils/styles";
const cors = require("cors");


const App=()=>{
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [{ user ,isSongPlaying}, dispatch] =
  useStateValue();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
            console.log("user",data);
          });
          
          // console.log(token);
        })
      }
      else{
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        navigate("/login");
      }
    });
  }, []);


  return (
    


    <AnimatePresence mode="wait">
    
    <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center">
    <Routes>
    <Route path="/login" element={<Login setAuth={setAuth}/>} />
    <Route path="/*" element={<Home />} />
    <Route path="/dashboard/*" element={<Dashboard />} />

    
    </Routes>
    {isSongPlaying &&(
      <motion.div initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} className={`fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}>

        <MusicPlayer />
      </motion.div>
    )}
    
    </div>
    </AnimatePresence>
  )
}

export default App;
