import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VerticalDashboard from "../../components/dashboard";
import Cookies from "js-cookie";

export default function Registro() {
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get();
  const [formValues, setFormValues] = useState({
    Name: "",
    Apellido: "",
    Email: "",
    Passwrd: "",
    Rol: "Mecanico",
  });

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (
      !formValues.Name ||
      !formValues.Apellido ||
      !formValues.Email ||
      !formValues.Passwrd
    ) {
      setError(true);
      return;
    }

    // Reiniciar notificaciones
    setNotificationVisible(false);
    setError(false);

    try {
      // Mapear el rol. 0 es mecanico y 1 es admin
      const mappedRolValue = formValues.Rol === "Mecanico" ? 0 : 1;
 
      const res = await axios.post(
        "https://localhost:3001/usuarios",
        {
          ...formValues,
          Rol: mappedRolValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      console.log(res.message);

      //await axios.post(`http://localhost:3001/correo/enviar`, formValues.Email);
      setSuccess(true);

      setTimeout(() => {
        //solo el administrador debería poder crear cuentas
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
        <div className="flex-grow mt-16">
          <h1 className="font-bold text-6xl text-center text-blue-950 mb-8">
            Registrar nuevo usuario
          </h1>
          <form className="flex flex-col p-48 mx-64" onSubmit={handleRegistro}>
            <label className="font-bold mb-2">Nombre</label>
            <input
              className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-950"
              type="text"
              id="Name"
              name="Name"
              placeholder="Nombre"
              required
              onChange={handleInputChange}
            />
            <label className="font-bold mb-2">Apellidos</label>
            <input
              className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-950"
              type="text"
              id="Apellido"
              name="Apellido"
              placeholder="Apellido"
              required
              onChange={handleInputChange}
            />

            <label className="font-bold mb-2">Correo electrónico</label>
            <input
              className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-950"
              type="email"
              id="Email"
              name="Email"
              placeholder="test@email.com"
              required
              onChange={handleInputChange}
            />

        <label className="font-bold mb-2" htmlFor="password">
          Contraseña
        </label>
        <input
          className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-900"
          type="password"
          id="Passwrd"
          name="Passwrd"
          minLength={8}
          onChange={handleInputChange}
          required
        />

            <label className="font-bold mb-2">Tipo de usuario</label>
            <select
              className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-950"
              name="Rol"
              id="Rol"
              onChange={handleInputChange}
            >
              <option value="Mecanico">Mecánico</option>
              <option value="Administrador">Administrador</option>
            </select>

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
