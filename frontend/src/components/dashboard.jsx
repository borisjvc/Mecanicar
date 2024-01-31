import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faCheckSquare,
  faClock,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";



function VerticalDashboard() {
  return (

    <div className="w-1/6 bg-blue-950 text-white p-4 min-h-screen fixed ">
      <img src={logo} className="mb-16 w-2/4 mx-auto" />

      <nav className="flex flex-col text-wrap">
        <a
          href="/"
          className="text-white no-underline flex items-center py-4 px-2 rounded-lg mb-2 hover:bg-orange-500 hover:text-white"
        >
          <FontAwesomeIcon icon={faHome} className="mr-4" />
          <span className="flex-shrink">Inicio</span>
        </a>
        <a
          href="/agregar"
          className="text-white no-underline flex items-center py-4 px-2 rounded-lg mb-2 hover:bg-orange-500 hover:text-white"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-4" />
          <span className="flex-shrink">Agregar Servicio</span>
        </a>
        <a
          href="/gestionar"
          className="text-white no-underline flex items-center py-4 px-2 rounded-lg mb-2 hover:bg-orange-500 hover:text-white"
        >
          <FontAwesomeIcon icon={faClock} className="mr-4" />
          <span className="flex-shrink">Servicios Pendientes</span>
        </a>
        <a
          href="/realizados"
          className="text-white no-underline flex items-center py-4 px-2 rounded-lg mb-2 hover:bg-orange-500 hover:text-white"
        >
          <FontAwesomeIcon icon={faCheckSquare} className="mr-4" />
          <span className="flex-shrink">Servicios Realizados</span>
        </a>
        <a
          href="/ayuda"
          className="text-white no-underline flex items-center py-4 px-2 rounded-lg mb-2 hover:bg-orange-500 hover:text-white"
        >
          <FontAwesomeIcon icon={faQuestionCircle} className="mr-4" />
          <span className="flex-shrink">Ayuda</span>
        </a>
      </nav>
    </div>

  );
}

export default VerticalDashboard;
