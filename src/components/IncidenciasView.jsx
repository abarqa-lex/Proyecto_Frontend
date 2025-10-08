import { useState, useEffect } from 'react';
import '../App.css';

function IncidenciasView() {
  const API_URL = "https://68afa171b91dfcdd62bcb747.mockapi.io/TL/incidencias";
  
  const [incidencias, setIncidencias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [incidenciaEditando, setIncidenciaEditando] = useState(null);
  const [formulario, setFormulario] = useState({
    titulo: "",
    descripcion: "",
    prioridad: "media",
    estado: "abierta",
    asignado_a: "",
    entidad_originadora: "",
    impacto: "medio",
    etapa: "",
    especialidad: ""
  });

  useEffect(() => {
    obtenerIncidencias();
  }, []);

  const obtenerIncidencias = () => {
    setCargando(true);
    setError(null);
    
    fetch(API_URL)
      .then(response => response.json())
      .then(datos => {
        setIncidencias(datos);
        setCargando(false);
      })
      .catch(error => {
        console.log("Error:", error);
        setError("No se pudieron cargar las incidencias");
        setCargando(false);
      });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    
    if (modoEdicion) {
      actualizarIncidencia();
    } else {
      crearIncidencia();
    }
  };

  const crearIncidencia = () => {
    const configuracion = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formulario)
    };
    
    fetch(API_URL, configuracion)
      .then(response => response.json())
      .then(nuevaIncidencia => {
        setIncidencias([...incidencias, nuevaIncidencia]);
        limpiarFormulario();
      })
      .catch(error => {
        console.log("Error:", error);
        setError("Error al crear incidencia");
      });
  };

  const actualizarIncidencia = () => {
    const urlEspecifica = `${API_URL}/${incidenciaEditando.id}`;
    
    const configuracion = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formulario)
    };
    
    fetch(urlEspecifica, configuracion)
      .then(response => response.json())
      .then(incidenciaActualizada => {
        setIncidencias(incidencias.map(inc => 
          inc.id === incidenciaActualizada.id ? incidenciaActualizada : inc
        ));
        limpiarFormulario();
      })
      .catch(error => {
        console.log("Error:", error);
        setError("Error al actualizar incidencia");
      });
  };

  const eliminarIncidencia = (idIncidencia) => {
    if (!confirm("¿Estás seguro de eliminar esta incidencia?")) {
      return;
    }
    
    const urlEspecifica = `${API_URL}/${idIncidencia}`;
    
    const configuracion = {
      method: "DELETE"
    };
    
    fetch(urlEspecifica, configuracion)
      .then(response => response.json())
      .then(() => {
        setIncidencias(incidencias.filter(inc => inc.id !== idIncidencia));
      })
      .catch(error => {
        console.log("Error:", error);
        setError("Error al eliminar incidencia");
      });
  };

  const prepararEdicion = (incidencia) => {
    setModoEdicion(true);
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
    window.scrollTo(0, 0);
  };

  const limpiarFormulario = () => {
    setFormulario({
      titulo: "",
      descripcion: "",
      prioridad: "media",
      estado: "abierta",
      asignado_a: "",
      entidad_originadora: "",
      impacto: "medio",
      etapa: "",
      especialidad: ""
    });
    setModoEdicion(false);
    setIncidenciaEditando(null);
    setError(null);
  };

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  if (cargando) {
    return (
      <div className="App">
        <div className="mensaje-estado">Cargando incidencias...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Sistema de Gestión de Incidencias</h1>

      {error && <div className="mensaje-error">{error}</div>}

      {/* FORMULARIO */}
      <div className="formulario-container">
        <h2>{modoEdicion ? "Editar Incidencia" : "Crear Nueva Incidencia"}</h2>
        <form onSubmit={manejarSubmit}>
          <div className="form-row">
            <label>
              Título: *
              <input
                type="text"
                name="titulo"
                value={formulario.titulo}
                onChange={manejarCambio}
                required
                placeholder="Ingrese el título"
              />
            </label>

            <label>
              Prioridad: *
              <select name="prioridad" value={formulario.prioridad} onChange={manejarCambio} required>
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
            </label>
          </div>

          <label>
            Descripción: *
            <textarea
              name="descripcion"
              value={formulario.descripcion}
              onChange={manejarCambio}
              required
              placeholder="Ingrese la descripción"
            />
          </label>

          <div className="form-row">
            <label>
              Estado: *
              <select name="estado" value={formulario.estado} onChange={manejarCambio} required>
                <option value="abierta">Abierta</option>
                <option value="en proceso">En Proceso</option>
                <option value="cerrada">Cerrada</option>
              </select>
            </label>

            <label>
              Impacto: *
              <select name="impacto" value={formulario.impacto} onChange={manejarCambio} required>
                <option value="bajo">Bajo</option>
                <option value="medio">Medio</option>
                <option value="alto">Alto</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Asignado a:
              <input
                type="text"
                name="asignado_a"
                value={formulario.asignado_a}
                onChange={manejarCambio}
                placeholder="Nombre del responsable"
              />
            </label>

            <label>
              Entidad Originadora:
              <input
                type="text"
                name="entidad_originadora"
                value={formulario.entidad_originadora}
                onChange={manejarCambio}
                placeholder="Entidad"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Etapa:
              <input
                type="text"
                name="etapa"
                value={formulario.etapa}
                onChange={manejarCambio}
                placeholder="Etapa del proyecto"
              />
            </label>

            <label>
              Especialidad:
              <input
                type="text"
                name="especialidad"
                value={formulario.especialidad}
                onChange={manejarCambio}
                placeholder="Especialidad técnica"
              />
            </label>
          </div>

          <div className="form-botones">
            <button type="submit" className="btn-guardar">
              {modoEdicion ? "Actualizar Incidencia" : "Crear Incidencia"}
            </button>
            {modoEdicion && (
              <button type="button" className="btn-cancelar" onClick={limpiarFormulario}>
                Cancelar Edición
              </button>
            )}
          </div>
        </form>
      </div>

      {/* LISTA DE INCIDENCIAS */}
      <h2>Lista de Incidencias ({incidencias.length})</h2>

      {incidencias.length === 0 ? (
        <div className="mensaje-vacio">
          <p>No hay incidencias registradas</p>
        </div>
      ) : (
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
                      onClick={() => prepararEdicion(incidencia)}
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
      )}
    </div>
  );
}

export default IncidenciasView;