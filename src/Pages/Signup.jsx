import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { useFirebase } from "../firebaseContext"
import { useNavigate } from "react-router";
import GradientText from "../GradientText";

export default function Signup() {
  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const firebase = useFirebase();
  const handleSubmit =
  async (e) => {
    e.preventDefault();
    try {
        console.log("Going")
      const result = await firebase.signupUserWithEmailAndPassword(email, password , displayName);
      console.log("Signup done", result)
    } catch {
      alert("email-already-in-use")
      
      
    } 
    
    };
const navigate = useNavigate();
  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/Home");
    } 
  }, [firebase, navigate, ]);
  return (
    <>

   <div className="lg:pt-10  pt-24 items-center justify-center ">
  <div className="max-w-sm mx-auto p-4">
        <h2 className="text-6xl  mb-4 text-center font-bold drop-shadow"> <GradientText
               colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
               animationSpeed={1}
               showBorder={false}
               className=""
             >
        NextDo 
             </GradientText></h2>
        <h2 className="text-3xl  mb-4 text-center font-bold drop-shadow">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Full Name:</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setdisplayName(e.target.value)}
              placeholder="Enter full name"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0ec57f] text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Create Account
          </button>
        </form>
        <NavLink to="/" >
          <button
            className="w-full mt-[0.4rem]  bg-[#3885f1] text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Already account?
          </button>
        </NavLink>
      </div>
    </div>
    
    </>
  );
}
