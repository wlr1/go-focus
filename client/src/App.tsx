import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./components/Auth/Signin";
import SignUp from "./components/Auth/Signup";
import Notes from "./components/Notes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
    children: [],
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/notes",
    element: <Notes />,
    children: [],
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
