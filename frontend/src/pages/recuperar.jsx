import axios from "axios";
import { useState } from "react";

export default function Recuperar() {
  const [formValues, setFormValues] = useState({
    Email: "",
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
        "https://localhost:3001/usuarios/recuperar",
        formData
      );
    } catch (error) {
      console.log(formData);
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <>
      <div className="mt-48 ml-200 mb-200 p-8">
        <h1 className="font-bold text-6xl text-center text-blue-950 mb-8">
          Recuperar contraseña
        </h1>
        <form className="flex flex-col p-16 mx-64 mt-16" onSubmit={handleSubmit}>

          <input
            className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-950"
            type="email"
            id="Email"
            name="Email"
            placeholder="Correo electrónico"
            required
            onChange={handleInputChange}
          />

          <button
            className="mt-4 px-16 py-2 bg-blue-950 text-white rounded-lg cursor-pointer text-xl self-center hover:bg-blue-900"
            type="submit"
          >
            Enviar código de recuperación
          </button>
        </form>
      </div>
    </>
  );
}