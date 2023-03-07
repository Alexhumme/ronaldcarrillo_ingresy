import { getAuth,signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


export default function NavBar(auth = false) {
  const navigate = useNavigate()
  const logOut = ()=>{
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate("/login")
      // Sign-out successful.
    }).catch((error) => {
      console.log(error)
      // An error happened.
    });
  };
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Ingresy
        </a>
        {
          auth 
          ? (<ul className="navbar-nav"><button className="btn btn-outline-primary" onClick={()=>logOut()}>logOut</button></ul>)
          : <span></span>
        }
      </div>
    </nav>
  );
}
