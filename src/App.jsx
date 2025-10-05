import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const API_URL = "https://68afa171b91dfcdd62bcb747.mockapi.io/TL/incidencias";
  
  const [incidencias, setIncidencias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [incidenciaEditando, setIncidenciaEditando] = useState(null);
  const [formulario, setFormulario] = useState({
    titulo: "",
    descripcion: "",
    prioridad: "media",
    estado: "abierta",
    asignado_a: "",
    entidad_originadora: "",
    impacto: "",
    etapa: "",
    especialidad: ""
  });

  useEffect(() => {
    obtenerIncidencias();
  }, []);

  const obtenerIncidencias = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(datos => {
        setIncidencias(datos);
      })
      .catch(error => console.log("Error:", error));
  };

  const crearIncidencia = (e) => {
    e.preventDefault();
    
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formulario)
    })
      .then(response => response.json())
      .then(nuevaIncidencia => {
        setIncidencias([...incidencias, nuevaIncidencia]);
        cerrarModal();
        alert("Incidencia creada exitosamente");
      })
      .catch(error => console.log("Error:", error));
  };

  const actualizarIncidencia = (e) => {
    e.preventDefault();
    
    const urlEspecifica = `${API_URL}/${incidenciaEditando.id}`;
    
    fetch(urlEspecifica, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formulario)
    })
      .then(response => response.json())
      .then(incidenciaActualizada => {
        setIncidencias(incidencias.map(inc => 
          inc.id === incidenciaActualizada.id ? incidenciaActualizada : inc
        ));
        cerrarModal();
        alert("Incidencia actualizada exitosamente");
      })
      .catch(error => console.log("Error:", error));
  };

  const eliminarIncidencia = (idIncidencia) => {
    if (!confirm("¿Estás seguro de eliminar esta incidencia?")) {
      return;
    }
    
    const urlEspecifica = `${API_URL}/${idIncidencia}`;
    
    fetch(urlEspecifica, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => {
        setIncidencias(incidencias.filter(inc => inc.id !== idIncidencia));
        alert("Incidencia eliminada exitosamente");
      })
      .catch(error => console.log("Error:", error));
  };

  const abrirModalCrear = () => {
    setIncidenciaEditando(null);
    setFormulario({
      titulo: "",
      descripcion: "",
      prioridad: "media",
      estado: "abierta",
      asignado_a: "",
      entidad_originadora: "",
      impacto: "",
      etapa: "",
      especialidad: ""
    });
    setMostrarModal(true);
  };

  const abrirModalEditar = (incidencia) => {
    setIncidenciaEditando(incidencia);
    setFormulario({
      titulo: incidencia.titulo,
      descripcion: incidencia.descripcion,
      prioridad: incidencia.prioridad,
      estado: incidencia.estado,
      asignado_a: incidencia.asignado_a,
      entidad_originadora: incidencia.entidad_originadora,
      impacto: incidencia.impacto,
      etapa: incidencia.etapa,
      especialidad: incidencia.especialidad
    });
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setIncidenciaEditando(null);
  };

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Sistema de Gestión de Incidencias</h1>
        <button className="btn-crear" onClick={abrirModalCrear}>
          + Crear Incidencia
        </button>
      </div>

      {/* TABLA DE INCIDENCIAS */}
      <div className="tabla-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Prioridad</th>
              <th>Estado</th>
              <th>Asignado a</th>
              <th>Entidad</th>
              <th>Impacto</th>
              <th>Etapa</th>
              <th>Especialidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {incidencias.map(incidencia => (
              <tr key={incidencia.id}>
                <td>{incidencia.id}</td>
                <td>{incidencia.titulo}</td>
                <td>{incidencia.descripcion}</td>
                <td>{incidencia.prioridad}</td>
                <td>{incidencia.estado}</td>
                <td>{incidencia.asignado_a}</td>
                <td>{incidencia.entidad_originadora}</td>
                <td>{incidencia.impacto}</td>
                <td>{incidencia.etapa}</td>
                <td>{incidencia.especialidad}</td>
                <td className="acciones">
                  <button 
                    className="btn-editar" 
                    onClick={() => abrirModalEditar(incidencia)}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button 
                    className="btn-eliminar" 
                    onClick={() => eliminarIncidencia(incidencia.id)}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL FORMULARIO */}
      {mostrarModal && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{incidenciaEditando ? "Editar Incidencia" : "Nueva Incidencia"}</h2>
            <form onSubmit={incidenciaEditando ? actualizarIncidencia : crearIncidencia}>
              <label>
                Título:
                <input
                  type="text"
                  name="titulo"
                  value={formulario.titulo}
                  onChange={manejarCambio}
                  required
                />
              </label>

              <label>
                Descripción:
                <textarea
                  name="descripcion"
                  value={formulario.descripcion}
                  onChange={manejarCambio}
                  required
                />
              </label>

              <label>
                Prioridad:
                <select name="prioridad" value={formulario.prioridad} onChange={manejarCambio}>
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </label>

              <label>
                Estado:
                <select name="estado" value={formulario.estado} onChange={manejarCambio}>
                  <option value="abierta">Abierta</option>
                  <option value="en proceso">En Proceso</option>
                  <option value="cerrada">Cerrada</option>
                </select>
              </label>

              <label>
                Asignado a:
                <input
                  type="text"
                  name="asignado_a"
                  value={formulario.asignado_a}
                  onChange={manejarCambio}
                />
              </label>

              <label>
                Entidad Originadora:
                <input
                  type="text"
                  name="entidad_originadora"
                  value={formulario.entidad_originadora}
                  onChange={manejarCambio}
                />
              </label>

              <label>
                Impacto:
                <input
                  type="text"
                  name="impacto"
                  value={formulario.impacto}
                  onChange={manejarCambio}
                />
              </label>

              <label>
                Etapa:
                <input
                  type="text"
                  name="etapa"
                  value={formulario.etapa}
                  onChange={manejarCambio}
                />
              </label>

              <label>
                Especialidad:
                <input
                  type="text"
                  name="especialidad"
                  value={formulario.especialidad}
                  onChange={manejarCambio}
                />
              </label>

              <div className="modal-botones">
                <button type="submit" className="btn-guardar">
                  {incidenciaEditando ? "Actualizar" : "Crear"}
                </button>
                <button type="button" className="btn-cancelar" onClick={cerrarModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;