import "../App.css";
import Navbar from "../componentes/navbar";
import { useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { estudianteInputs } from "../estudiantesInputs";

function Estudiantes() {
  const [error, setError] = useState(false);
  const [data,setData] = useState({documento:""})
  let dialogState = "create"

  const handleInput = (e)=>{
    const id = e.target.id
    const value = e.target.value

    setData({...data, [id]: value})
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("crear")
    try {
      const res = await setDoc(doc(db, "estudiantes", data.documento), {
        ...data,
        timetamp: serverTimestamp(),
      });
      document.getElementById("closeModal").click()
      document.getElementById("resetModal").click()
      setError(false)
      setData({})
      console.log(res);
    }catch(err){
      setError(true)
      console.log(err)
    }
  };
  const handleEdit = (e) => {
    e.preventDefault();
    console.log("editar")
  };

  return (
    <div className="App">
      <Navbar />
      <div className="card">
        <h1 className="card-header">Estudiantes</h1>

        <table className="table card-body" style={{ marginBottom: 0 + "px" }}>
          <thead>
            <tr>
              <th scope="col">Documento</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Grado</th>
              <th scope="col">Grupo</th>
              <th scope="col">Edad</th>
              <th scope="col">Fecha de ingreso</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>4</td>
              <td>3</td>
              <td>14</td>
              <td>24/3/2023</td>
              <td>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#formModal"
                  >
                    Editar
                  </button>
                  <button type="button" className="btn btn-danger">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <button
          className="btn btn-success"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#formModal"
        >
          Añadir
        </button>
      </div>
      <div
        className="modal fade"
        id="formModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form
              onSubmit={dialogState === "create" ? handleCreate : handleEdit}
            >
              <div className="modal-header">
                <h2 className="modal-title fs-5" id="exampleModalLabel">
                  { dialogState }
                </h2>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="closeModal"
                ></button>
              </div>
              <div className="modal-body">
                {estudianteInputs.map((input)=>(
                <div className="mb-3 formInput" key={input.id}>
                  <label htmlFor={input.id} className="form-label">
                    {input.label}
                  </label>
                  <input
                    className="form-control"
                    id={input.id}
                    type={input.type}
                    onChange={handleInput}
                    required
                  />
                </div>
                ))}

                {error && (
                  <span className="authError-msg">
                    No se ha podido añadir al estudiante, puede que su documento a exista en la base de datos
                  </span>
                )}
              </div>
              <div className="modal-footer">
                <button type="reset" id="resetModal" className="btn btn-outline-light"></button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary" >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Estudiantes;
