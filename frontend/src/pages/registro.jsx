import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VerticalDashboard from "../components/dashboard";

export default function Registro() {
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    Name: "",
    Apellido: "",
    Email: "",
    Passwrd: "",
    Rol: 1,
  });

  const handleRegistro = async (e) => {
    e.preventDefault();
    // Reiniciar notificaciones
    setNotificationVisible(false);
    setError(false);
    try {
      await axios.post("http://localhost:3001/usuarios", formValues);
      //await axios.post(`http://localhost:3001/correo/enviar`, formValues.Email);
      setSuccess(true);

      setTimeout(() => {
        //solo el administrador deberia poder crear cuentas
        //navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Error al registrar usuario", error.response.data);
      setError(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <>
      <div className="flex h-screen">
        <VerticalDashboard />
        <div className="flex-grow mt-16 mb-200 text">
          <h1 className="font-bold text-6xl text-center text-blue-950 mb-8">
            Registrar nuevo mecánico
          </h1>
          <form className="flex flex-col p-8 mx-64" onSubmit={handleRegistro}>
            <label className="font-bold mb-2">Nombre</label>
            <input
              className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-950"
              type="text"
              id="Name"
              name="Name"
              required
              onChange={handleInputChange}
            />
            <label className="font-bold mb-2">Apellidos</label>
            <input
              className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-950"
              type="text"
              id="Apellido"
              name="Apellido"
              required
              onChange={handleInputChange}
            />

            <label className="font-bold mb-2">Correo electrónico</label>
            <input
              className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-950"
              type="email"
              id="Email"
              name="Email"
              required
              onChange={handleInputChange}
            />

            <label className="font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-950"
              type="password"
              id="Passwrd"
              name="Passwrd"
              required
              min={8}
              max={50}
              onChange={handleInputChange}
            />

            <button
              className="px-16 py-2 bg-blue-950 text-white rounded-lg cursor-pointer text-xl self-center hover:bg-blue-900"
              type="submit"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
