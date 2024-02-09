import React, { useEffect, useState } from "react";
import VerticalDashboard from "../components/dashboard";
import axios from "axios";
import { PiWrenchFill,PiChartBarFill ,PiBroomFill, PiPoliceCarBold, PiHourglassHighBold, PiWhatsappLogoFill, PiEnvelopeFill  } from "react-icons/pi";
import Cookies from "js-cookie";

function Inicio() {
  const token = Cookies.get();
  const [count, setCount] = useState([]);

  const fetchCount = async () => {
    try {
      const response = await axios.get("https://localhost:3001/trabajos/count", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      console.log(response.data)
      //filtrar para solo mostrar usuarios que no hayan sido eliminados
      setCount(response.data);
  
    } catch (error) {
      console.error("Error al obtener contador:", error);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <VerticalDashboard />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-50 p-8 h-[100vh] overflow-y-scroll">
      <h1 className="text-4xl font-sans font-bold mb-8">Bienvenido a Mecanicar</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10 gap-8">

          <div className="bg-azulito text-center p-8 rounded-xl text-gray-300 flex flex-col gap-6">
            <PiPoliceCarBold className="text-5xl" />
            <h4 className="text-2xl">Servicios Realizados</h4>
            <span className="text-5xl text-white">{count.terminados}</span>
            <a href="/realizados" className="py-2 px-6 rounded-xl font-semibold w-full bg-miniazul  text-azulito">
              Visualizar
            </a>
          </div>

          <div className="bg-azulito text-center p-8 rounded-xl text-gray-300 flex flex-col gap-6">
            <PiHourglassHighBold className="text-5xl" />
            <h4 className="text-2xl">Servicios Pendientes</h4>
            <span className="text-5xl text-white">{count.pendientes}</span>
            <a href="/gestionar" className="py-2 px-6 rounded-xl font-semibold w-full bg-miniazul  text-azulito">
              Visualizar
            </a>
          </div>

          <div className="bg-azulito p-9 rounded-xl text-gray-300 flex flex-col gap-6">
            <h4 className="text-center text-2xl">Contactos</h4>

            <div className="flex items-center gap-24 bg-miniazul rounded-xl p-3">
              <span className="bg-azulito text-gray-300 text-2xl font-bold p-2 rounded-full">
                <PiWhatsappLogoFill  />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-azulito">9983390436 ó 9988457608</h3>
              </div>
            </div>                     
            <div className="flex items-center gap-24 bg-miniazul rounded-xl p-3">
              <span className="bg-azulito text-gray-300 text-2xl font-bold p-2 rounded-full">
                <PiEnvelopeFill  />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-azulito">Mecanicar.taller@gmail.com</h3>
              </div>
            </div>
            <span className="text-5xl text-white"></span>

          </div>

          <h1></h1><h1></h1><h1></h1>


            <h1 className="text-2xl font-sans font-bold mb-8">Trabajos que Realizamos:</h1>
            <h1></h1>
            <h1></h1>

          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="flex items-center gap-4 bg-miniazul rounded-xl p-3">
              <span className="bg-azulito text-gray-300 text-2xl font-bold p-2 rounded-full">
                <PiWrenchFill />
              </span>
              <div>
                <h3 className="text-lg font-bold text-azulito">Reparación Mecánica</h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="flex items-center gap-4 bg-miniazul rounded-xl p-3">
              <span className="bg-azulito text-gray-300 text-2xl font-bold p-2 rounded-full">
              <PiBroomFill />
              </span>
              <div>
                <h3 className="text-lg font-bold text-azulito">Chapa y Pintura</h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="flex items-center gap-4 bg-miniazul rounded-xl p-3">
              <span className="bg-azulito text-gray-300 text-2xl font-bold p-2 rounded-full">
              <PiChartBarFill />
              </span>
              <div>
                <h3 className="text-lg font-bold text-azulito">Revisión</h3>
              </div>
            </div>
          </div>

       

          </section>


      </main>
    </div>
  );
}

export default Inicio;
