import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
  const [formData, setFormData] = useState({
    Email: "",
    Passwrd: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/usuarios/login",
        formData
      );

      if (response.data.token)
        Cookies.set("token", response.data.token, { expires: 1 / 8 }); // 3 horas de duración
    } catch (error) {
      console.log(formData);
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <>
      <div className="mt-16 ml-200 mb-200 p-8">
        <h1 className="font-bold text-6xl text-center text-blue-950 mb-8">
          Inicia sesión
        </h1>
        <form className="flex flex-col p-16 mx-64" onSubmit={handleSubmit}>
          <label className="font-bold mb-2">Correo electrónico</label>

          <input
            className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-950"
            type="email"
            id="Email"
            name="Email"
            required
            onChange={handleInputChange}
          />

          <label className="font-bold mb-2">Contraseña</label>
          <input
            className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-950"
            type="password"
            id="Passwrd"
            name="Passwrd"
            required
            onChange={handleInputChange}
          />

          <button
            className="mt-4 px-16 py-2 bg-blue-950 text-white rounded-lg cursor-pointer text-xl self-center hover:bg-blue-900"
            type="submit"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="text-center mt-4 mb-6">
          ¿Olvidaste tu contraseña?{" "}
          <a href="/recuperar" className="font-bold text-blue-800 underline">
            Recupérala
          </a>
        </p>
      </div>
    </>
  );
}