import React, { useEffect, useState } from 'react';
import VerticalDashboard from '../components/dashboard';
import { RiLineChartLine, RiHashtag } from "react-icons/ri";
import axios from 'axios';

function Gestionar() {
    const [trabajos, setTrabajos] = useState([]);

    useEffect(() => {
        const fetchTrabajos = async () => {
            try {
                const response = await axios.get("http://localhost:3001/trabajos");
                // Filtrar trabajos con estado 0
                const trabajosFiltrados = response.data.filter(trabajo => trabajo.estadoTrabajo === 0);
                setTrabajos(trabajosFiltrados);
            } catch (error) {
                console.error("Error al obtener trabajos:", error);
            }
        };

        fetchTrabajos();
    }, []);

    // Función para manejar la visualización de los detalles de la operación
    const handleVisualizar = (id) => {
        // Lógica para visualizar los detalles de la operación según el ID
        console.log(`Visualizar detalles de la operación con ID: ${id}`);
    };

    return (
        <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
            <VerticalDashboard />
            <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
                <h1 className="text-4xl font-bold mb-8">Gestión de Servicios</h1>

                {/* Section 2 */}
                <section className="grid grid-cols-1 md:grid-cols-1 mt-10 gap-8">
                    <div>
                        {/* Table */}
                        <div className="bg-miniazul p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="font-bold text-center py-2">ID</th>
                                        <th className="font-bold text-center py-2">Vehiculo</th>
                                        <th className="font-bold text-center py-2">Modelo</th>
                                        <th className="font-bold text-center py-2">Placas</th>
                                        <th className="font-bold text-center py-2">Servicio</th>
                                        <th className="font-bold text-center py-2">Descripción</th>
                                        <th className="font-bold text-center py-2">Horas</th>
                                        <th className="font-bold text-center py-2">Operacion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trabajos.map((trabajo, vehiculo) => (
                                        <tr key={trabajo.idTrabajo}>
                                            <td className="text-center py-2">{trabajo.idTrabajo}</td>
                                            <td className="text-center py-2">{trabajo.vehiculo}</td>
                                            <td className="text-center py-2">{trabajo.modelo}</td>
                                            <td className="text-center py-2">{trabajo.placas}</td>
                                            <td className="text-center py-2">{vehiculo.tipo}</td>
                                            <td className="text-center py-2">{vehiculo.descripcion}</td>
                                            <td className="text-center py-2">{vehiculo.horasTrabajo}</td>
                                            <td className="text-center py-2">
                                                <button
                                                    className="bg-azulito text-white px-4 py-2 rounded-md"
                                                    onClick={() => handleVisualizar(trabajo.idTrabajo)}
                                                >
                                                    Visualizar
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
