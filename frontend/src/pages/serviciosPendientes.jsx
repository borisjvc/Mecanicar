import React, { useEffect, useState } from "react";
import VerticalDashboard from "../components/dashboard";
import { RiLineChartLine, RiHashtag } from "react-icons/ri";
import axios from "axios";
import Cookies from "js-cookie";
//TODO: Calcular precio, se modifico la base de datos
function Gestionar() {
  const token = Cookies.get();
  const [trabajos, setTrabajos] = useState([]);
  const [nombre, setNombre] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(null);
  const [trabajoEditado, setTrabajoEditado] = useState(null);
  const [formValues, setFormValues] = useState({
    materiales: "",
    precioMaterial: 0,
    horas: 0,
  });

  const fetchTrabajos = async () => {
    try {
      const response = await axios.get("https://localhost:3001/trabajos", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      setNombre(response.data.nombre);
      // Filtrar trabajos con estado Pendiente
      const trabajosFiltrados = response.data.trabajos.filter(
        (trabajo) => trabajo.estadoTrabajo === 0
      );

      setTrabajos(trabajosFiltrados);
    } catch (error) {
      console.error("Error al obtener trabajos:", error);
    }
  };

  useEffect(() => {
    fetchTrabajos();
  }, []);

  const handleFinalizar = async (id) => {
    const resultado = window.confirm(
      "¿Estás seguro que quieres marcar este trabajo como finalizado? No se podrá revertir esta acción"
    );
    if (resultado)
      try {
        const response = await axios.put(
          `https://localhost:3001/trabajos/${id}`,
          { estado: 1 },
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );
        fetchTrabajos();
      } catch (error) {
        console.error("Error al marcar como finalizado: ", error);
      }

    return;
  };

  const handleGuardarCambios = async () => {
    try {
      if (formValues.materiales && formValues.precioMaterial) {
        const response = await axios.post(
          `https://localhost:3001/materiales`,
          {
            idTrabajo: trabajoEditado.idTrabajo,
            nombre: formValues.materiales,
            precio: formValues.precioMaterial,
          },
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );
      }

      if (formValues.horas > 0) {
        await axios.put(
          `https://localhost:3001/trabajos/${trabajoEditado.idTrabajo}`,
          { horas: formValues.horas },
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );
      }

      fetchTrabajos();
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar cambios: ", error);
    }
  };

  const handleVisualizar = (id) => {
    const trabajoSeleccionado = trabajos.find(
      (trabajo) => trabajo.idTrabajo === id
    );
    setTrabajoSeleccionado(trabajoSeleccionado);
  };

  const handleEditar = (id) => {
    const trabajoSeleccionado = trabajos.find(
      (trabajo) => trabajo.idTrabajo === id
    );
    setTrabajoEditado(trabajoSeleccionado);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setFormValues({
      horas: 0,
      materiales: "",
      precioMaterial: 0,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <VerticalDashboard />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-50 p-8 h-[100vh] overflow-y-scroll">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Servicios pendientes de {nombre}
        </h1>

        <section className="grid grid-cols-1 md:grid-cols-1 mt-10 gap-8">
          <div>
            <div className="bg-white p-8 rounded-xl shadow-md mb-8 flex flex-col gap-8">
              <table className="w-full">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="font-bold text-center py-2">Placas</th>
                    <th className="font-bold text-center py-2">Modelo</th>
                    <th className="font-bold text-center py-2">Marca</th>
                    <th className="font-bold text-center py-2">Servicio</th>
                    <th className="font-bold text-center py-2">Descripción</th>
                    <th className="font-bold text-center py-2">Horas</th>
                    <th className="font-bold text-center py-2">Operaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {trabajos.map((trabajo) => (
                    <tr
                      key={trabajo.idTrabajo}
                      className="hover:bg-blue-100 transition-all"
                    >
                      <td className="text-center py-2">{trabajo.placas}</td>
                      <td className="text-center py-2">{trabajo.modelo}</td>
                      <td className="text-center py-2">{trabajo.marca}</td>
                      <td className="text-center py-2">
                        {trabajo.tipoTrabajoTexto}
                      </td>
                      <td className="text-center py-2 overflow-hidden max-w-[150px] whitespace-nowrap overflow-ellipsis">
                        {trabajo.descripcion}
                      </td>
                      <td className="text-center py-2">
                        {trabajo.horasTrabajo}
                      </td>
                      <td className="text-center py-2">
                        <button
                          className="bg-sky-600 hover:bg-sky-800 text-white px-4 py-2 rounded-md"
                          onClick={() => handleEditar(trabajo.idTrabajo)}
                        >
                          Editar
                        </button>
                        <button
                          className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded-md ml-6"
                          onClick={() => handleVisualizar(trabajo.idTrabajo)}
                        >
                          Detalles
                        </button>

                        <button
                          className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-md ml-6"
                          onClick={() => handleFinalizar(trabajo.idTrabajo)}
                        >
                          Marcar como finalizado
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        {trabajoSeleccionado && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div
              className="absolute w-full h-full bg-black bg-opacity-50 backdrop-blur-md"
              onClick={() => setTrabajoSeleccionado(null)}
            ></div>
            <div className="bg-white p-8 rounded-xl z-10 max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Detalles del Trabajo</h2>
              <p>Placas: {trabajoSeleccionado.placas}</p>
              <p>Modelo: {trabajoSeleccionado.modelo}</p>
              <p>Servicio: {trabajoSeleccionado.tipoTrabajoTexto}</p>
              <p>
                Descripción:{" "}
                {expanded
                  ? trabajoSeleccionado.descripcion
                  : trabajoSeleccionado.descripcion.slice(0, 55) + "..."}
              </p>
              {trabajoSeleccionado.descripcion.length > 55 && (
                <button
                  className="text-blue-500 underline"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "Mostrar menos" : "Mostrar más"}
                </button>
              )}
              {/* Calcular el importe según el tipo de trabajo */}
              {trabajoSeleccionado.tipoTrabajoTexto ===
                "Reparación mecánica" && (
                <p>
                  Importe:{" "}
                  {parseFloat(trabajoSeleccionado.costoMaterial) * 1.1 +
                    trabajoSeleccionado.horasTrabajo * 350}
                </p>
              )}
              {trabajoSeleccionado.tipoTrabajoTexto ===
                "Reparación de chapa y pintura" && (
                <p>
                  Importe:{" "}
                  {parseFloat(trabajoSeleccionado.costoMaterial) * 1.3 +
                    trabajoSeleccionado.horasTrabajo * 350}
                </p>
              )}
              {trabajoSeleccionado.tipoTrabajoTexto === "Revisión" && (
                <p>
                  Importe:{" "}
                  {parseFloat(trabajoSeleccionado.costoMaterial) +
                    trabajoSeleccionado.horasTrabajo * 350 +
                    450}
                </p>
              )}

              <button
                className="bg-rose-600 hover:bg-rose-800 text-white px-4 py-2 rounded-md mt-4"
                onClick={() => setTrabajoSeleccionado(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {modalVisible && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            {/* Fondo oscuro del modal */}
            <div
              className="absolute w-full h-full bg-black bg-opacity-50 backdrop-blur-md"
              onClick={handleCloseModal}
            ></div>
            {/* Contenido del modal */}
            <div className="bg-white p-8 rounded-xl z-10 max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">
                Agregar horas/material
              </h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Horas
                  </label>
                  <input
                    type="number"
                    min={0}
                    name="horas"
                    value={formValues.horas}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Material
                  </label>
                  <input
                    type="text"
                    maxLength={50}
                    name="materiales"
                    value={formValues.materiales}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Precio Material
                  </label>
                  <input
                    type="number"
                    min={0}
                    name="precioMaterial"
                    value={formValues.precioMaterial}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <button
                  type="button"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-4"
                  onClick={handleGuardarCambios}
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  className="bg-rose-600 hover:bg-rose-800 text-white px-4 py-2 rounded-md mt-4 ml-4"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Gestionar;
