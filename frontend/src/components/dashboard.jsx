import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faCheckSquare,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";

function VerticalDashboard() {
  return (

    <div className="w-1/6 bg-blue-950 text-white p-4">
      <img src={logo} className="mb-16 w-2/4 mx-auto" />

      <nav className="flex flex-col text-wrap">
        <a
          href="/"
          className="text-white no-underline flex items-center py-6 px-4 rounded-lg mb-2 hover:bg-orange-500 hover:text-white"
        >
          <FontAwesomeIcon icon={faHome} className="mr-4" />
          Inicio
        </a>
        <a
          href="/agregar"
          className="text-white no-underline flex items-center py-6 px-4 rounded-lg mb-2 hover:bg-orange-500 hover:text-white"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-4" />
          Agregar Servicio
        </a>
        <a
          href="/gestionar"
          className="text-white no-underline flex items-center py-6 px-4 rounded-lg mb-2 hover:bg-orange-500 hover:text-white"
        >
          <FontAwesomeIcon icon={faClock} className="mr-4" />
          Servicios Pendientes
        </a>
        <a
          href="/realizados"
          className="text-white no-underline flex items-center py-6 px-4 rounded-lg mb-2 hover:bg-orange-500 hover:text-white"
        >
          <FontAwesomeIcon icon={faCheckSquare} className="mr-4" />
          Servicios Realizados
        </a>

      </nav>
    </div>

  );
};

export default VerticalDashboard;
