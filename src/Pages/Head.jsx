import { NavLink } from "react-router-dom";
import { useFirebase } from "../firebaseContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import GradientText from "../GradientText";
function Head() {
  const firebase = useFirebase();
  const { user, logout } = useFirebase();
  const userName = user?.displayName;
const navigate = useNavigate();
  useEffect(() => {
    if (firebase.isLoggedIn) {
      console.log(firebase.isLoggedIn)
      navigate("/Home");
    } else navigate("/")
  }, [firebase, navigate, ]);
  return (
    <div className="flex w-full shadow items-center justify-between p-4">
     <h1 className="text-4xl font-bold drop-shadow">

 <GradientText
       colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
       animationSpeed={1}
       showBorder={false}
       className=""
     >
NextDo 
     </GradientText>
</h1>

      <div className="flex items-center space-x-4">
        {userName && (
          <h1 className="lg:text-lg font-medium  wrap-break-word ">Welcome, {userName}</h1>
        )}
        <NavLink to="/">
          <button
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-3xl"
            onClick={logout}
          >
            Logout
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Head;
