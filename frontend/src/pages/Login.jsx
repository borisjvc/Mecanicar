import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: "",
    Passwrd: "",
  });

  useEffect(() => {
    // Verificar la presencia de un token al cargar el componente
    const token = Cookies.get("token");
    if (token) {
      navigate("/inicio");
    }
  }, [navigate]);

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
        "https://localhost:3001/Usuarios/login",
        formData
      );

      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 1 / 8 }); // 3 horas de duración
        navigate("/inicio");
      }
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
        <form className="flex flex-col p-16 mx-[500px]" onSubmit={handleSubmit}>
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
      </div>
    </>
  );
}
