import { useState, useEffect } from "react";
import {  NavLink } from "react-router-dom";
import { useFirebase } from "../firebaseContext";
import { useNavigate } from "react-router-dom";
import GradientText from "../GradientText";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebase = useFirebase();
  console.log(firebase);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Going");
      const result = await firebase.signIn(email, password);
      console.log("Signup done", result);
    
    } catch  {
      alert("Invalid-credential or User not found");
    }
  };

  const handlerSignINGoogle = async () => {
    
     await firebase.signInWithGoogle();
     
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/Home");
    }
  }, [firebase,navigate]);

  return (
    <>
<div className=" lg:pt-10 pt-26 items-center justify-center ">
<div className=" max-w-sm mx-auto p-4  " >

      <h2 className="text-6xl  mb-4 text-center font-bold drop-shadow"> <GradientText
               colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
               animationSpeed={1}
               showBorder={false}
               className=""
             >
        NextDo 
             </GradientText></h2>
        <h2 className="text-3xl  mb-4 text-center font-bold drop-shadow">Login</h2>
    
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email:</label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password:</label>
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full  bg-[#3885f1] text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <NavLink to="/Signup">
          <button className="w-full mt-[0.4rem]  bg-[#0ec57f] text-white py-2 rounded-md hover:bg-green-700 transition">
            Create account
          </button>
        </NavLink>
        <div className="relative m-2 mt-4">
          <p className="absolute left-40 bg-white -top-3 px-2  text-sm " >or</p>
          <hr className="border-gray-300" />
          </div>
        <button
          onClick={handlerSignINGoogle}
          className="w-full mt-[0.4rem] text-center place-items-center  place-content-center flex border bg-white text-blue py-2 rounded-md hover:bg-black hover:text-white transition"
        >
         <FcGoogle className=" mr-2 text-xl align-middle " />
 Sign in With Google
        </button>
      </div>
</div>
   
   


 
    </>
  );
}
