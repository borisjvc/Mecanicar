import React from "react";
import VerticalDashboard from "../components/dashboard";

import { PiWrenchFill,PiChartBarFill ,PiBroomFill, PiPoliceCarBold, PiHourglassHighBold, PiWhatsappLogoFill, PiEnvelopeFill  } from "react-icons/pi";
import { RiLineChartLine, RiHashtag } from "react-icons/ri";


function Inicio() {
  return (
    
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <VerticalDashboard />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
      <h1 className="text-4xl font-semibold mb-8">Bienvenido a Mecanicar</h1>
            <h1></h1>
            <h1></h1>
        {/* Seccion 1 */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10 gap-8">

          <div className="bg-azulito text-center p-8 rounded-xl text-gray-300 flex flex-col gap-6">
            <PiPoliceCarBold className="text-5xl" />
            <h4 className="text-2xl">Servicios Realizados</h4>
            <span className="text-5xl text-white">3</span>
            <a href="/realizados" className="py-2 px-6 rounded-xl font-medium w-full bg-miniazul  text-azulito">
              Visualizar
            </a>
          </div>

          <div className="bg-azulito text-center p-8 rounded-xl text-gray-300 flex flex-col gap-6">
            <PiHourglassHighBold className="text-5xl" />
            <h4 className="text-2xl">Servicios Pendientes</h4>
            <span className="text-5xl text-white">2</span>
            <a href="/gestionar" className="py-2 px-6 rounded-xl font-medium w-full bg-miniazul  text-azulito">
              Visualizar
            </a>
          </div>

          <div className="bg-azulito p-9 rounded-xl text-gray-300 flex flex-col gap-6">
            <h4 className="text-center text-2xl">Contactos</h4>

            <div className="flex items-center gap-12 bg-miniazul rounded-xl p-3">
              <span className="bg-azulito text-gray-300 text-2xl font-bold p-2 rounded-full">
                <PiWhatsappLogoFill  />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-azulito">9983390436 o 9988457608</h3>
              </div>
            </div>                     
            <div className="flex items-center gap-12 bg-miniazul rounded-xl p-3">
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


            <h1 className="text-2xl font-bold mb-8">Nuestros Servicios:</h1>
            <h1></h1>
            <h1></h1>



          {/* Card 3 */}
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
