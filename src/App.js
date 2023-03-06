import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import ErrorPage from "./error-page";
import Estudiantes from "./routes/Estudiantes";
import Login from "./routes/Login";

function App() {


    const {currentUser} = useContext(AuthContext)


    const RequireAuth = ({children}) => {
        return currentUser !== null ? children : <Navigate to="/login" />
    }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" errorElement={<ErrorPage />}>
          <Route path="login" element={<Login />}/>
          <Route index path="estudiantes" element={<RequireAuth><Estudiantes /></RequireAuth> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
