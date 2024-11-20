import { useState, useEffect } from "react";

const useUserName = () => {
  const [userName, setUserName] = useState("");



  useEffect(() => {
    try {
      const name = localStorage.getItem("loggedInUser");
      if (name) {
        setUserName(name);
      }
    } catch (error) {
      setUserName("")
      console.error(error.stack);
      
    }
 
  }, []);

  return userName;
};

export default useUserName;
