import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./components/Auth/Signin";
import SignUp from "./components/Auth/Signup";
// import Notes from "./components/Notes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StartPage from "./components/StartPage/StartPage";
import PomoPage from "./components/PomoPage/PomoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/pomo",
    element: <PomoPage />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
