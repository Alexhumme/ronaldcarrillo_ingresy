import { useNavigate } from "react-router-dom";
import Navbar from '../componentes/navbar';
import '../App.css';
import { auth } from '../firebase/index'
import { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from "../context/AuthContext";



function Login() {

  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate()

  const {dispatch} = useContext(AuthContext)

  const handleLogin = (e)=>{
    e.preventDefault();
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user})
        navigate("/estudiantes")
        // ...
      })
      .catch((error) => {
        setError(true)
        // ..
      });
  }

  return (
    <div className="App">
      {Navbar(false)}
      <main className="container-formulario card">
        <div className='card-header'> <h2>Ingresa</h2> </div>
        <div className='card-body'>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e=>setEmail(e.target.value)}/>
              <div id="emailHelp" className="form-text">Por favor digite cu correo electronico.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="exampleInputPassword1" onInput={e=>setPassword(e.target.value)}/>
          </div>
          <button type="" className="btn btn-primary">Entrar</button>
        </form>
        {error && <span className='authError-msg'>email y/o contraseña incorrectos!</span>}
        </div>
      </main>
    </div>
  );
}

export default Login;
