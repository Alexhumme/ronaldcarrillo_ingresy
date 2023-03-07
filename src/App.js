import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import ErrorPage from "./error-page";
import Estudiantes from "./routes/Estudiantes";
import Login from "./routes/Login";
import Home from "./routes/Home";

function App() {


    const {currentUser} = useContext(AuthContext)


    const RequireAuth = ({children}) => {
        return currentUser ? children : <Navigate to="/login" />
    }

  return (
    <BrowserRouter errorElement={<ErrorPage />}>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="login" element={<Login />}/>
          <Route path="estudiantes" element={<RequireAuth><Estudiantes /></RequireAuth>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
