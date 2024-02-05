import React, { useState } from "react";
import logo from "../assets/logo.png";
import {
  PiHouseBold,
  PiPlusCircleBold,
  PiHourglassHighBold,
  PiPoliceCarBold,
  PiInfoBold,
  PiSignInBold,
  PiUserCircleBold,
  PiUserBold,
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

//TODO: Recuperacion de contraseña
//TODO: Perfil usuario
const VerticalDashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRoles");

  const handleLogout = () => {
    // Borrar las cookies al cerrar sesión
    Cookies.remove("token");
    localStorage.removeItem("userRoles");
  };

  return (
    <>
      <div
        className={`bg-azulito h-full fixed lg:static w-[80%] md:w-[40%] lg:w-full "left-0" : "-left-full"
        }`}
      >
        {/* Profile */}
        <div className="flex flex-col items-center justify-center p-8 gap-2 h-[30vh]">
          <img
            src={logo}
            className="w-20 h-20 rounded-lg ring-2 ring-gray-300"
          />
        </div>
        {/* Nav */}
        <div className="bg-azulito p-8  h-[70vh]  flex flex-col justify-between gap-8">
          <nav className="flex flex-col gap-8">
          <a
              href="/perfil"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <PiUserBold/> Perfil
            </a>
            <a
              href="/inicio"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <PiHouseBold /> Inicio
            </a>
            {userRole === '1' && (
              <a
                href="/usuarios"
                className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
              >
                <PiUserCircleBold /> Usuarios
              </a>
            )}
            <a
              href="/agregar"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <PiPlusCircleBold /> Agregar Servicio
            </a>
            <a
              href="/gestionar"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <PiHourglassHighBold /> Servicios Pendientes
            </a>
            <a
              href="/realizados"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <PiPoliceCarBold /> Servicios Realizados
            </a>
          </nav>

          <div className="bg-primary-900/50 text-white text- p-4 rounded-xl">
            <a
              href="/"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl  hover:bg-primary-900/50 transition-colors"
              onClick={handleLogout}
            >
              <PiSignInBold /> Cerrar Sesión
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerticalDashboard;
