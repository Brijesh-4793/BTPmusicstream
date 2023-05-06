import React from 'react'
import { Logo } from "../assets/img/index";
import { NavLink, Route, Routes,useNavigate } from "react-router-dom";

import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { FaCrown,FaEnvelope,FaEnvelopeSquare,FaInstagram,FaInstagramSquare,FaMobile,FaPhone,FaVoicemail,FaWhatsapp, FaWhatsappSquare } from "react-icons/fa";
import { useStateValue } from "../Context/StateProvider";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';
import UserProfile from './UserProfile';
import Home from './Home';
import { PlayListCard } from './MusicPlayer';
import { RiPlayListFill } from 'react-icons/ri';
import { MdEmail, MdOutlineEmail } from 'react-icons/md';



function Header() {



  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
const [isAbout, setisAbout] = useState(false)

  const [isMenu, setIsMenu] = useState(false);
  const [isContact, setisContact] = useState(false);
  const logout = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });
  };

  return (

    
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
<NavLink to={"/"}>
        <img src={Logo} className="w-16" alt="" />
      </NavLink>

      <ul className="flex items-center justify-center ml-7">
        <li className="mx-5 text-lg"><NavLink to={'/home'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Home</NavLink></li>
           {/* About us */}
       <div  onMouseEnter={() => setisAbout(true)}
        onMouseLeave={() => setisAbout(false)}
        className="flex items-center ml-auto cursor-pointer gap-4 relative p-4 mx-5 text-lg">
        About Us
        {isAbout && (<motion.div  initial={{ opacity: 1, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: 50 }} className="absolute z-10 top-12 right-0 w-275 p-4 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col">

          
        <p className="font-semibold">We are the music website provider founded in 2345.</p>
        </motion.div>
        )}
        </div>
        
{/* contact   */}
        <div  onMouseEnter={() => setisContact(true)}
        onMouseLeave={() => setisContact(false)}
        className="flex items-center ml-auto cursor-pointer gap-4 relative p-4 mx-5 text-lg">
        Contact Us
        {isContact && (<motion.div  initial={{ opacity: 1, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: 50 }} className="absolute z-10 top-12 right-0 w-275 p-4 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col">

          
        <p><FaPhone className="text-xm -ml-1 text-black-200" />12345-67891</p> 
        <p><FaWhatsapp className="text-xm -ml-1 text-green-500" />+91 1234567890</p> 
        
        <p><FaInstagram className="text-xm -ml-1 text-blue-400 " />musicworld_@_4793</p> 
        <p><FaEnvelope className="text-xm -ml-1 text-red-400" /><a href="mailto:musicworld@gmail.com">musicworld@gmail.com</a></p> 
        </motion.div>
        )}
        </div>
       


         
        
        
      </ul>
     

      <div  onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
        className="flex items-center ml-auto cursor-pointer gap-4 relative">
           <img
          className="w-12 min-w-[50px] object-cover rounded-full shadow-lg"
          src={user?.user?.imageURL}
          alt="" Referrer-Policy= " no-referrer"
/>
        <div className="flex flex-col p-2">

          <p className="text-textColor text-lg items-center hover:text-headingColor font-semibold">
          {user?.user.name}
          </p>
          
          
        </div>
        {isMenu && (<motion.div  initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }} className="absolute z-10 top-12 right-0 w-275 p-4 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col">
        
          
          <p className="text-textColor text-md hover:text-headingColor font-semibold ">
          Profile</p>
          <p className="text-textColor text-sm hover:text-headingColor ">
          {user?.user.role}</p>
          <p className="text-textColor text-sm hover:text-headingColor ">
          email:{user?.user.email}</p>
          <p className="text-textColor text-sm hover:text-headingColor ">
          id:{user?.user.user_id}
          </p>
          <hr />
            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
              My Favourites
            </p>
           
            
           
            {user?.user.role === "admin" && (
              <>
                <NavLink to={"/dashboard/home"}>
                  <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                    Dashboard
                  </p>
                </NavLink>
                <hr />
              </>
            )}
            <p
              className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
              onClick={logout}
            >
              Sign out
            </p>
            </motion.div>
        )}
        
       
        </div>

   </header>
  )
}

export default Header;
