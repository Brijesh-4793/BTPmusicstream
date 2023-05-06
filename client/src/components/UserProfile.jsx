import React from "react";
import Header from "./Header";
import { useStateValue } from "../Context/StateProvider";

const UserProfile = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-green-300">
      
      
          {user?.user.name}
     
    </div>
  );
};

export default UserProfile;
