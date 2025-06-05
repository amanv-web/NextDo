import { useState, useEffect } from "react";
import {  NavLink } from "react-router-dom";
import { useFirebase } from "../firebaseContext";
import { useNavigate } from "react-router-dom";
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
   <h2 className="text-6xl  mb-4 text-center font-bold drop-shadow">TASKly</h2>
        <h2 className="text-5xl  mb-4 text-center font-bold drop-shadow">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email:</label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full  bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <NavLink to="/Signup">
          <button className="w-full mt-[0.4rem]  bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
            Create account
          </button>
        </NavLink>

        <button
          onClick={handlerSignINGoogle}
          className="w-full mt-[0.4rem] border bg-white text-blue py-2 rounded-md hover:bg-black hover:text-white transition"
        >
          Sign in With Google
        </button>
      </div>
</div>
   
   


 
    </>
  );
}
