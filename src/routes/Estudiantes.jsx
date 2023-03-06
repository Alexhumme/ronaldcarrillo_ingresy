import '../App.css';
import Navbar from '../componentes/navbar';

function Estudiantes() {
  
  return (
    <div className="App">
      <Navbar/>
      <div className="card">

      <h1 className='card-header'>Estudiantes</h1>

      <table className="table card-body" style={{marginBottom:0 + "px"}}>
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
              <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
              <button type="button" className="btn btn-primary">Editar</button>
              <button type="button" className="btn btn-danger">Eliminar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
        <button className='btn btn-success'>Añadir</button>
     
      </div>
    </div>
  );
}

export default Estudiantes;
