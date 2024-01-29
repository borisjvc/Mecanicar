import React from "react";
import logo from "../assets/logo.png";

const VerticalDashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="w-48 bg-blue-950 text-white p-4">
        <img src={logo} className="mb-32"/>

        <nav className="flex flex-col">
          <a
            href="/"
            className="text-white no-underline py-6 px-4 rounded-lg mb-2 hover:bg-blue-800 hover:text-white"
          >
            Inicio
          </a>
          <a
            href="/agregar"
            className="text-white no-underline py-6 px-4 rounded-lg mb-2 hover:bg-blue-800 hover:text-white"
          >
            Agregar Servicio
          </a>
          <a
            href="/gestionar"
            className="text-white no-underline py-6 px-4 rounded-lg mb-2 hover:bg-blue-800 hover:text-white"
          >
            Servicios Pendientes
          </a>
          <a
            href="/realizados"
            className="text-white no-underline py-6 px-4 rounded-lg mb-2 hover:bg-blue-800 hover:text-white"
          >
            Servicios Realizados
          </a>
        </nav>
      </div>
      <div className="flex-1 p-4">{/* Contenido del dashboard */}</div>
    </div>
  );
};

export default VerticalDashboard;
