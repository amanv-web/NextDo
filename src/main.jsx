import "./index.css";
import ReactDOM from "react-dom/client";
import { FirebaseProvider } from "./firebaseContext.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import Signup from "./Pages/Signup.jsx";
import App from "./App.jsx";
import Home from "./Pages/Home.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
 <Route path="/" element={<App />}>  {/* App is the layout wrapper */}
      <Route index element={<LoginPage />} />        {/* / → LoginPage */}
      <Route path="Signup" element={<Signup />} />   {/* /Signup → Signup */}
      <Route path="Home" element={<Home />} />       {/* /Home → Home */}
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </FirebaseProvider>
);