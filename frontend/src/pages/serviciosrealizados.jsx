import React from 'react';
import VerticalDashboard from '../components/dashboard';
import { RiLineChartLine, RiHashtag } from "react-icons/ri";

function Realizados() {
  // Función para manejar la visualización de los detalles de la operación
  const handleVisualizar = (id) => {
    // Lógica para visualizar los detalles de la operación según el ID
    console.log(`Visualizar detalles de la operación con ID: ${id}`);
  };

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <VerticalDashboard />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
        <h1 className="text-4xl font-bold mb-8">Servicios Realizados</h1>

        {/* Section 2 */}
        <section className="grid grid-cols-1 md:grid-cols-1 mt-10 gap-8">
          <div>
              {/* Table */}
              <div className="bg-miniazul p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="font-bold text-center py-2">ID</th>
                      <th className="font-bold text-center py-2">Propietario</th>
                      <th className="font-bold text-center py-2">Vehiculo</th>
                      <th className="font-bold text-center py-2">Modelo</th>
                      <th className="font-bold text-center py-2">Placas</th>
                      <th className="font-bold text-center py-2">Servicio</th>
                      <th className="font-bold text-center py-2">Descripción</th>
                      <th className="font-bold text-center py-2">Horas</th>
                      <th className="font-bold text-center py-2">Importe</th>

                    </tr>
                  </thead>
                  <tbody>
                    {/* Ejemplo de fila de la tabla */}
                    <tr>
                      <td className="text-center py-2">1</td>
                      <td className="text-center py-2">Juan Salmeron</td>
                      <td className="text-center py-2">Toyota</td>
                      <td className="text-center py-2">Camry</td>
                      <td className="text-center py-2">ABC123</td>
                      <td className="text-center py-2">Mantenimiento</td>
                      <td className="text-center py-2">Mantenimiento preventivo</td>
                      <td className="text-center py-2">2</td>
                      <td className="text-center font-bold py-2">&#36; 200</td>


                    </tr>
                    {/* Otras filas de la tabla */}
                  </tbody>
                </table>
              </div>
          </div>
          <div></div>
        </section>
      </main>
    </div>
  );
}

export default Realizados;
