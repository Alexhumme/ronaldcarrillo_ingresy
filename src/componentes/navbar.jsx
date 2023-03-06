import { signOut } from "firebase/auth";

export default function NavBar(auth = false) {
  let logOut;

    

  logOut = (
    <li className="nav-item">
      <a className="nav-link active" aria-current="page" href="#">
        LogOut
      </a>
    </li>
  );

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Ingresy
        </a>
        <ul className="navbar-nav">{logOut}</ul>
      </div>
    </nav>
  );
}
