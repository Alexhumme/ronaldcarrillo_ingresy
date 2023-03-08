import "../App.css";
import Navbar from "../componentes/navbar";
import { useEffect, useState } from "react";
import {
  doc,
  serverTimestamp,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { estudianteInputs } from "../estudiantesInputs";

function Estudiantes() {
  const [error, setError] = useState(false);
  const [data, setData] = useState({ documento: "" });
  const [dataTable, setDataTable] = useState([]);
  let dialogState = "create";

  const fetchData = async () => {
    let list = [];
    try {
      const querySnapshot = await getDocs(collection(db, "estudiantes"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push({ id: doc.id, ...doc.data() });
      });
      setDataTable(list);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("crear");
    try {
      if (dataTable.find((est) => est.documento === data.documento)) {
        setError(true);
      } else {
        await setDoc(doc(db, "estudiantes", data.documento), {
          ...data,
          timetamp: serverTimestamp(),
        });
        document.getElementById("closeModal").click();
        document.getElementById("resetModal").click();
        setError(false);
        setData({});
        fetchData()
      }
    } catch (err) {
      setError(true);
    }
  };
  const handleDelete = async (id)=>{

    try {
      await deleteDoc(doc(db, "estudiantes", id));
      fetchData()
      console.log("eliminado")
    } catch (error) {
      
    }
  }
  const handleEdit = (e) => {
    e.preventDefault();
    console.log("editar");
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
            {dataTable.map((estudiante) => (
              <tr key={estudiante.id}>
                <th scope="row">{estudiante.id}</th>
                <td>{estudiante.nombre}</td>
                <td>{estudiante.apellido}</td>
                <td>{estudiante.grado}</td>
                <td>{estudiante.grupo}</td>
                <td>{estudiante.edad}</td>
                <td>{estudiante.timetamp.toDate().toLocaleDateString()}</td>
                <td>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" className="btn btn-danger" onClick={()=>handleDelete(estudiante.id)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
                  {dialogState === "create" ? <span>Aniadir estudiante</span>:<span>Editar Estudiante</span>}
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
                {estudianteInputs.map((input) => (
                  <div className="mb-3 formInput" key={input.id}>
                   
                    <input
                      className="form-control"
                      id={input.id}
                      type={input.type}
                      onChange={handleInput}
                      placeholder={input.placeholder}
                      required
                    />
                  </div>
                ))}

                {error && (
                  <span className="authError-msg">
                    No se ha podido añadir al estudiante, puede que su documento
                    a exista en la base de datos
                  </span>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="reset"
                  id="resetModal"
                  className="btn btn-outline-dark"
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
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
