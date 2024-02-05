import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: "",
    Passwrd: "",
  });
  const [formCodigo, setFormCodigo] = useState({
    codigo: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  const handleCodigoChange = (e) => {
    setFormCodigo({
      ...formCodigo,
      codigo: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await axios.post(
        "https://localhost:3001/usuarios/login",
        formData
      );

      Cookies.remove("token");

      //enviar un codigo a su correo
      if (response.data.token) {
        await axios.post("https://localhost:3001/correo", {
          correo: formData.Email,
        });
        setToken(response.data.token);
        openModal();
      } else {
        setErrorMessage(response.data.message);
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const handleSubmitCodigo = async (e) => {
    e.preventDefault();
    //validar que el código sea correcto
    const codigoValido = await axios.post(
      `https://localhost:3001/correo/validar`,
      {
        "codigo": formCodigo.codigo,
        "correo": formData.Email,
      }
    );

    if (codigoValido.data) {
      Cookies.set("token", token, { expires: 1 / 8 }); // 3 horas de duración
      navigate("/inicio");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full max-w-md">
        <div className="mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <img
              src={logo}
              className="mx-auto w-24 h-24 rounded-lg ring-2 ring-gray-300"
              alt="Logo"
            />
            <h2 className="mt-10 text-center text-3xl font-bold leading-9 text-azulito">
              Inicia Sesión
            </h2>
          </div>
          <div className="px-8 py-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Correo Electrónico
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="Email"
                    name="Email"
                    required
                    onChange={handleInputChange}
                    className="block w-full mt-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-miniazul focus:border-azulito text-sm"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Contraseña
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="Passwrd"
                    name="Passwrd"
                    required
                    onChange={handleInputChange}
                    className="block w-full mt-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-miniazul focus:border-azulito text-sm"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {showPassword ? (
                      <RiEyeOffFill
                        className="h-5 w-5 text-gray-400 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <RiEyeFill
                        className="h-5 w-5 text-gray-400 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </span>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-azulito px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azulito"
                >
                  Iniciar Sesión
                </button>
              </div>
              <div>
                {errorMessage && (
                  <div className="flex items-center space-x-2">
                    <span className="text-red-600">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1.5em"
                        width="1.5em"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
                      </svg>
                    </span>
                    <p className="text-red-600">{errorMessage}</p>
                  </div>
                )}
              </div>
            </form>
            {isModalOpen && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <div
                  className="absolute w-full h-full bg-black bg-opacity-50 backdrop-blur-md"
                  onClick={closeModal}
                ></div>
                <div className="bg-white p-8 rounded-xl z-10 max-h-[80vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-4">Se envió un código de verificación a tu correo</h2>
                  <form
                    className="flex flex-col p-16"
                    onSubmit={handleSubmitCodigo}
                  >
                    <label className="font-bold mb-2">
                      Código de Verificación
                    </label>
                    <input
                      type="text"
                      name="codigo"
                      value={formCodigo.codigo}
                      onChange={handleCodigoChange}
                      minLength={6}
                      maxLength={6}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-4"
                    >
                      Verificar Código
                    </button>
                  </form>
                  <button
                    className="px-16 py-2 bg-rose-600 hover:bg-rose-800 text-white rounded-lg cursor-pointer text-xl self-center "
                    onClick={closeModal}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
