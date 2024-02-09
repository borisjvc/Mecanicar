import { useState, useEffect } from "react";
import VerticalDashboard from "../components/dashboard";
import { RiLineChartLine, RiHashtag } from "react-icons/ri";
import Cookies from "js-cookie";
import axios from "axios";

function Realizados() {
  const token = Cookies.get();
  const [trabajos, setTrabajos] = useState([]);
  const [nombre, setNombre] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(null);

  const fetchTrabajos = async () => {
    try {
      const response = await axios.get("https://localhost:3001/trabajos", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      // Filtrar trabajos con estado Finalizado
      setNombre(response.data.nombre);

      // Filtrar trabajos con estado Pendiente
      const trabajosFiltrados = response.data.trabajos.filter(
        (trabajo) => trabajo.estadoTrabajo === 1
      );

      setTrabajos(trabajosFiltrados);
    } catch (error) {
      console.error("Error al obtener trabajos:", error);
    }
  };

  const handleVisualizar = (id) => {
    const trabajoSeleccionado = trabajos.find(
      (trabajo) => trabajo.idTrabajo === id
    );
    setTrabajoSeleccionado(trabajoSeleccionado);
  };

  useEffect(() => {
    fetchTrabajos();
  }, []);

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <VerticalDashboard />

      <main className="lg:col-span-3 xl:col-span-5 bg-gray-50 p-8 h-[100vh] overflow-y-scroll">
        <h1 className="text-4xl font-sans font-bold mb-8">
          Servicios Finalizados de {nombre}
        </h1>
        <br></br>
        {/* Section 2 */}
        <section className="grid grid-cols-1 md:grid-cols-1 mt-10 gap-8">
          <div>
            {/* Table */}
            <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col">
              <table className="w-full">
                <thead className="bg-azulito text-white">
                  <tr>
                    <th className="font-bold font-sans text-lg text-center py-2">
                      Placas
                    </th>
                    <th className="font-bold font-sans text-lg text-center py-2">
                      Modelo
                    </th>
                    <th className="font-bold font-sans text-lg text-center py-2">
                      Marca
                    </th>
                    <th className="font-bold font-sans text-lg text-center py-2">
                      Servicio
                    </th>
                    <th className="font-bold font-sans text-lg text-center py-2">
                      Descripción
                    </th>
                    <th className="font-bold font-sans text-lg text-center py-2">
                      Horas
                    </th>
                    <th className="font-bold font-sans text-lg text-center py-2">
                      Importe
                    </th>
                    <th className="font-bold font-sans text-lg text-center py-2">
                      Operación
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trabajos.map((trabajo) => (
                    <tr
                      key={trabajo.idTrabajo}
                      className="hover:bg-blue-100  transition-all"
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
                      <td className="text-center font-semibold py-2">
                        {trabajo.tipoTrabajoTexto === "Reparación mecánica" && (
                          <>
                            $
                            {(parseFloat(trabajo.costoMaterial) || 0) * 1.1 +
                              trabajo.horasTrabajo * 350}
                          </>
                        )}
                        {trabajo.tipoTrabajoTexto ===
                          "Reparación de chapa y pintura" && (
                          <>
                            $
                            {(parseFloat(trabajo.costoMaterial) || 0) * 1.3 +
                              trabajo.horasTrabajo * 350}
                          </>
                        )}
                        {trabajo.tipoTrabajoTexto === "Revisión" && (
                          <>${trabajo.horasTrabajo * 350 + 450}</>
                        )}
                      </td>
                      <td className="text-center py-2">
                        <button
                          className="bg-azulito hover:bg-blue-800 text-white px-4 py-2 rounded-md"
                          onClick={() => handleVisualizar(trabajo.idTrabajo)}
                        >
                          Detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        {/* Modal para mostrar detalles del trabajo seleccionado */}
        {trabajoSeleccionado && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div
              className="absolute w-full h-full bg-black bg-opacity-50 backdrop-blur-md"
              onClick={() => setTrabajoSeleccionado(null)}
            ></div>
            <div className="bg-white p-24 rounded-xl z-10">
              <h2 className="text-3xl font-sans font-bold mb-8">
                Detalles del Trabajo
              </h2>
              <p className="text-xl font-sans">
                Placas: {trabajoSeleccionado.placas}
              </p>
              <p className="text-xl font-sans">
                Modelo: {trabajoSeleccionado.modelo}
              </p>
              <p className="text-xl font-sans">
                Servicio: {trabajoSeleccionado.tipoTrabajoTexto}
              </p>
              <p className="text-xl font-sans">
                Descripción:{" "}
                {expanded
                  ? trabajoSeleccionado.descripcion
                  : trabajoSeleccionado.descripcion.slice(0, 55)}
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
                <p className="text-xl font-sans">
                  Importe: $
                  {(parseFloat(trabajoSeleccionado.costoMaterial) || 0) * 1.1 +
                    trabajoSeleccionado.horasTrabajo * 350}
                </p>
              )}
              {trabajoSeleccionado.tipoTrabajoTexto ===
                "Reparación de chapa y pintura" && (
                <p className="text-xl font-sans">
                  Importe: $
                  {(parseFloat(trabajoSeleccionado.costoMaterial) || 0) * 1.3 +
                    trabajoSeleccionado.horasTrabajo * 350}
                </p>
              )}
              {trabajoSeleccionado.tipoTrabajoTexto === "Revisión" && (
                <p className="text-xl font-sans">
                  Importe: $
                  {trabajoSeleccionado.horasTrabajo * 350 +
                    450}
                </p>
              )}
              <br></br>
              <button
                className="bg-rojo hover:bg-red-800 text-white w-full px-6 py-2 rounded-md mt-4"
                onClick={() => setTrabajoSeleccionado(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Realizados;
