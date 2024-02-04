import React, { useEffect, useState } from "react";
import VerticalDashboard from "../components/dashboard";
import { RiLineChartLine, RiHashtag } from "react-icons/ri";
import axios from "axios";
import Cookies from "js-cookie";

function Gestionar() {
  const token = Cookies.get();
  const [trabajos, setTrabajos] = useState([]);
  const [nombre, setNombre] = useState(null);

  const fetchTrabajos = async () => {
    try {
      const response = await axios.get("https://localhost:3001/trabajos", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      setNombre(response.data.nombre)
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
    const resultado = window.confirm("¿Estás seguro que quieres marcar este trabajo como finalizado? No se podrá revertir esta acción")
    if(resultado)
      try {
        const response = await axios.put(`https://localhost:3001/trabajos/${id}`, {"estado": 1},{
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        });
        fetchTrabajos();
      } catch (error) {
        console.error("Error al marcar como finalizado: ", error);
      }
    
    return
  };

  const handleVisualizar = (id) => {
    
    console.log(`Visualizar detalles de la operación con ID: ${id}`);
  };


  //TODO: Poder modificar los datos de los servicios
  //TODO: Agregar materiales, tal vez una tabla en la base de datos

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <VerticalDashboard />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
        <h1 className="text-4xl font-bold mb-8">Servicios pendientes de {nombre}</h1> 

        {/* Section 2 */}
        <section className="grid grid-cols-1 md:grid-cols-1 mt-10 gap-8">
          <div>
            {/* Table */}
            <div className="bg-miniazul p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
              <table className="w-full">
                <thead className="bg-blue-950 text-white">
                  <tr>
                    <th className="font-bold text-center py-2">Placas</th>
                    <th className="font-bold text-center py-2">Modelo</th>
                    <th className="font-bold text-center py-2">Marca</th>
                    <th className="font-bold text-center py-2">Servicio</th>
                    <th className="font-bold text-center py-2">Descripción</th>
                    <th className="font-bold text-center py-2">Horas</th>
                    <th className="font-bold text-center py-2">Operacion</th>
                  </tr>
                </thead>
                <tbody>
                  {trabajos.map((trabajo) => (
                    <tr key={trabajo.idTrabajo} className="hover:bg-blue-300  transition-all">
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
                          className="bg-azulito text-white px-4 py-2 rounded-md"
                          onClick={() => handleVisualizar(trabajo.idTrabajo)}
                        >
                          Visualizar
                        </button>
                        <button
                          className="bg-azulito text-white px-4 py-2 rounded-md ml-6"
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
      </main>
    </div>
  );
}

export default Gestionar;
