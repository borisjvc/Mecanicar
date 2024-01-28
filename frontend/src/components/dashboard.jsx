import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faCheckSquare,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";

const VerticalDashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/6 bg-blue-950 text-white p-4">
        <img src={logo} className="mb-16 w-2/4 mx-auto" />

        <nav className="flex flex-col">
          <a
            href="/"
            className="text-white no-underline flex items-center py-6 px-4 rounded-lg mb-2 hover:bg-blue-800 hover:text-white"
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Inicio
          </a>
          <a
            href="/agregar"
            className="text-white no-underline flex items-center py-6 px-4 rounded-lg mb-2 hover:bg-blue-800 hover:text-white"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Agregar Servicio
          </a>
          <a
            href="/gestionar"
            className="text-white no-underline flex items-center py-6 px-4 rounded-lg mb-2 hover:bg-blue-800 hover:text-white"
          >
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            Servicios Pendientes
          </a>
          <a
            href="/realizados"
            className="text-white no-underline flex items-center py-6 px-4 rounded-lg mb-2 hover:bg-blue-800 hover:text-white"
          >
            <FontAwesomeIcon icon={faCheckSquare} className="mr-2" />
            Servicios Realizados
          </a>
        </nav>
      </div>
    </div>
  );
};

export default VerticalDashboard;
