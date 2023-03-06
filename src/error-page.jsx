import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center">
                <h1 class="display-1 fw-bold">ERROR</h1>
                <p class="fs-3"> <span class="text-danger">Opps!</span> Se ha presentado un error.</p>
                <p class="lead">
                    Puede que la pagina que busques no exista.
                  </p>
                <a href="/login" class="btn btn-primary">Volver</a>
            </div>
        </div>
    </div>
  );
}