import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Homeimage from "../assets/Homeimage.png";

const Home = () => {
    const navigate = useNavigate();
    const [user, setuser] = useState(null);

    useEffect(()=>{
      const storedUser = localStorage.getItem("user");
      setuser(storedUser);
    }, []);
  return (
  <div className="flex justify-content: items-center flex-col gap-8  text-shadow-2xs h-screen w-full bg-cover bg-center bg-no-repeat"
  style={{backgroundImage: `url(${Homeimage})`}} >
    <h1 className="font-bold text-shadow-2xl mt-5 ">Welcome to Namma Huliyar</h1>
    {user && (
      <button onClick={()=>navigate("/create-business")} className="bg-green-700 text-white hover:bg-green-600 px-4 py-2 rounded-lg shadow-md transition duration-200 ">
      Add Your Business ➕
    </button>)}
    </div>

);
};

export default Home;