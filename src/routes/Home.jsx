//import { useRouteError } from "react-router-dom";

export default function Home() {
    //const error = useRouteError();
    //console.error(error);
  
    return (
      <div id="error-page">
        <div className="d-flex align-items-center justify-content-center vh-100">
              <div className="text-center">
                  <h1 className="display-1 fw-bold">INGRESY</h1>
                  <p className="fs-3"> <span className="text-success">Saludos!</span> bienvenido a su pagina de registros.</p>
                  <p className="lead">
                      Empiece ingresando con su cuenta asignada.
                    </p>
                  <a href="/login" className="btn btn-primary">Login</a>
              </div>
          </div>
      </div>
    );
  }