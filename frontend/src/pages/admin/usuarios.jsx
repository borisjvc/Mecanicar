import VerticalDashboard from "../../components/dashboard";
import { useState, useEffect } from "react";
import { PiPlusBold, PiTrashBold, PiNotePencilBold } from "react-icons/pi";
import axios from "axios";
import Cookies from "js-cookie";

export default function Usuarios() {
  const token = Cookies.get();
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalReg, setShowModalReg] = useState(false);
  const [formValues, setFormValues] = useState({
    Name: "",
    Apellido: "",
    Email: "",
    Passwrd: "",
    Rol: "Mecanico",
  });
  const regex = /^(?!\s)(?!.*\s{2,})[\w ]+$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("https://localhost:3001/usuarios", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      //filtrar para solo mostrar usuarios que no hayan sido eliminados
      const usuariosFiltrados = response.data.filter(
        (users) => users.activo === 1 && users.idUsuario != 1
      );
      setUsuarios(usuariosFiltrados);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const [formRegistro, setFormRegistro] = useState({
    Name: "",
    Apellido: "",
    Email: "",
    Passwrd: "",
    Rol: "Mecanico",
  });

  const handleRegistro = async (e) => {
    e.preventDefault();
    
    
    if (
      !regex.test(formRegistro.Name) ||
      !regex.test(formRegistro.Apellido) ||
      !emailRegex.test(formRegistro.Email) ||
      !formRegistro.Passwrd
    ) {
      window.confirm("Error: Los campos no cumplen con el formato requerido.");
      console.error("Error: Los campos no cumplen con el formato requerido.");
      return;
    }

    try {
      // Mapear el rol. 0 es mecanico y 1 es admin
      const mappedRolValue = formRegistro.Rol === "Mecanico" ? 0 : 1;

      const res = await axios.post(
        "https://localhost:3001/usuarios",
        {
          ...formRegistro,
          Rol: mappedRolValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      console.log(res.message);
      //si se creó exiotosamente mandar un correo
      //await axios.post(`http://localhost:3001/correo/enviar`, formValues.Email);
      closeModalReg();
      fetchUsuarios();
    } catch (error) {
      console.error("Error al registrar usuario", error.response.data);
    }
  };

  const handleEditar = (userId) => {
    const selected = usuarios.find((user) => user.idUsuario === userId);
    setSelectedUser(selected);
    setShowModalEdit(true);
    setFormValues({
      Name: selected.nombre || "",
      Apellido: selected.apellido || "",
      Email: selected.correo || "",
      Passwrd: "Mecanicar2024",
      Rol: getRolTexto(selected.rol),
    });
  };

  const handleEliminar = async (userId) => {
    const resultado = window.confirm(
      "¿Estás seguro que quieres eliminar este usuario? No se podrá revertir esta acción"
    );
    if (resultado) {
      try {
        const response = await axios.delete(
          `https://localhost:3001/usuarios/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );
        console.log(response.data.message);
        fetchUsuarios();
      } catch (error) {
        console.error("Error al eliminar usuario: ", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value.trim(),
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormRegistro({
      ...formRegistro,
      [name]: value.trim(),
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const mappedRolValue = formValues.Rol === "Mecanico" || formValues.Rol === "Mecánico" ? 0 : 1;
    if (
      !regex.test(formValues.Name) ||
      !regex.test(formValues.Apellido) ||
      !emailRegex.test(formValues.Email) ||
      !formValues.Passwrd
    ) {
      window.confirm("Error: Los campos no cumplen con el formato requerido.");
      console.error("Error: Los campos no cumplen con el formato requerido.");
      return;
    }

    try {
      const response = await axios.put(
        `https://localhost:3001/usuarios/${selectedUser.idUsuario}`,
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
    } catch (error) {
      console.error("Error al actualizar usuario: ", error);
    }

    closeModalEdit();
    fetchUsuarios();
  };

  const closeModalEdit = () => {
    setShowModalEdit(false);
    setSelectedUser(null);
  };

  const closeModalReg = () => {
    setShowModalReg(false);
  };

  const getRolTexto = (rol) => {
    return rol === 1 ? "Administrador" : "Mecánico";
  };

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <VerticalDashboard />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-50 p-8 h-[100vh] overflow-y-scroll">
        <h1 className="text-4xl font-sans font-bold mb-8">
          Gestión de usuarios
        </h1>

        <section className="grid grid-cols-1 md:grid-cols-1 mt-10 gap-8">
          <div>
            <h1 className="text-xl font-bold mb-4">Más Opciones:</h1>

            <button
              className="bg-azulito hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg mb-4 flex items-center"
              onClick={() => setShowModalReg(true)}
            >
              <PiPlusBold className="mr-2" /> Crear nuevo usuario
            </button>
            <br></br>
            {/* Table */}
            <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="font-bold font-sans text-lg text-center py-2">
                      Nombre
                    </th>
                    <th className="font-bold font-sans text-lg text-center py-2">
                      Apellido
                    </th>
                    <th className="font-bold font-sans text-lg text-center py-2">
                      Correo
                    </th>
                    <th className="font-bold font-sans text-lg text-center py-2">
                      Rol
                    </th>
                    <th className="font-bold font-sans text-lg text-center py-2">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr
                      key={usuario.idUsuario}
                      className="hover:bg-miniazul rounded-md transition duration-300 ease-in-out"
                    >
                      <td className="text-center py-3">{usuario.nombre}</td>
                      <td className="text-center py-3">{usuario.apellido}</td>
                      <td className="text-center py-3">{usuario.correo}</td>
                      <td className="text-center py-3">
                        {getRolTexto(usuario.rol)}
                      </td>
                      <td className="text-center py-3">
                        <div className="flex space-x-4 justify-center">
                          <button
                            className="bg-verde hover:bg-green-800 flex items-center gap-4 text-white px-4 py-2 rounded-md transition-all"
                            onClick={() => handleEditar(usuario.idUsuario)}
                          >
                            <PiNotePencilBold /> Editar
                          </button>
                          <button
                            className="bg-rojo hover:bg-red-800 flex items-center gap-4 text-white px-3 py-2 rounded-md transition-all"
                            onClick={() => handleEliminar(usuario.idUsuario)}
                          >
                            <PiTrashBold /> Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {showModalEdit && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div
            className="absolute w-full h-full bg-black bg-opacity-50 backdrop-blur-md"
            onClick={closeModalEdit}
          ></div>
          <div className="bg-white p-24 rounded-xl z-10 overflow-y-auto">
            <h2 className="text-4xl text-center font-sans font-bold leading-8 mb-4">
              Modificar Datos del Usuario
            </h2>
            <br></br>

            <form className="flex flex-col" onSubmit={handleUpdate}>
              <label className="font-semibold text-lg mb-2">Nombre</label>
              <input
                className="px-4 py-2 border-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-azulito focus:border-transparent"
                type="text"
                id="Name"
                name="Name"
                placeholder="Nombre"
                required
                onChange={handleInputChange}
                value={formValues.Name}
              />

              <label className="font-semibold text-lg mb-2">Apellidos</label>
              <input
                className="px-4 py-2 border-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-azulito focus:border-transparent"
                type="text"
                id="Apellido"
                name="Apellido"
                placeholder="Apellido"
                required
                onChange={handleInputChange}
                value={formValues.Apellido}
              />

              <label className="font-semibold text-lg mb-2">
                Correo electrónico
              </label>
              <input
                className="px-4 py-2 border-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-azulito focus:border-transparent"
                type="email"
                id="Email"
                name="Email"
                placeholder="usuario@email.com"
                required
                onChange={handleInputChange}
                value={formValues.Email}
              />

              <label className="font-semibold text-lg mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                className="px-4 py-2 border-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-azulito focus:border-transparent"
                type="password"
                id="Passwrd"
                name="Passwrd"
                minLength={8}
                onChange={handleInputChange}
                value={formValues.Passwrd}
                required
              />

              <label className="font-semibold text-lg mb-2">
                Tipo de usuario
              </label>
              <select
                className="px-4 py-2 border-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-azulito focus:border-transparent"
                name="Rol"
                id="Rol"
                onChange={handleInputChange}
                value={formValues.Rol}
              >
                <option value="Mecanico">Mecánico</option>
                <option value="Administrador">Administrador</option>
              </select>

              <br></br>
              <br></br>
              <div className="flex justify-between">
                <button
                  className="px-20 py-2 bg-azulito hover:bg-blue-800 text-white rounded-lg cursor-pointer font-semibold mb-4 text-base"
                  type="submit"
                >
                  Enviar cambios
                </button>
                <button
                  className="px-16 py-2 bg-rojo hover:bg-red-800 text-white rounded-lg cursor-pointer font-semibold mb-4 text-base"
                  onClick={closeModalEdit}
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModalReg && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div
            className="absolute w-full h-full bg-black bg-opacity-50 backdrop-blur-md"
            onClick={closeModalReg}
          ></div>

          <div className="bg-white p-24 rounded-xl z-10 overflow-y-auto">
            <h2 className="text-4xl text-center font-sans font-bold leading-8 text-gray-900 mb-8">
              Agrega los Datos del Nuevo Usuario
            </h2>
            <br></br>

            <form className="flex flex-col" onSubmit={handleRegistro}>
              <label className="font-semibold text-lg mb-2">Nombre</label>
              <input
                className="px-4 py-2 border-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-azulito focus:border-transparent"
                type="text"
                id="Name"
                name="Name"
                placeholder="Nombre"
                required
                onChange={handleInput}
              />
              

              <label className="font-semibold text-lg mb-2">Apellido</label>
              <input
                className="px-4 py-2 border-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-azulito focus:border-transparent"
                type="text"
                id="Apellido"
                name="Apellido"
                placeholder="Apellido"
                required
                onChange={handleInput}
              />

              <label className="font-semibold text-lg mb-2">
                Correo electrónico
              </label>
              <input
                className="px-4 py-2 border-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-azulito focus:border-transparent"
                type="email"
                id="Email"
                name="Email"
                placeholder="test@email.com"
                required
                onChange={handleInput}
              />

              <label className="font-semibold text-lg mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                className="px-4 py-2 border-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-azulito focus:border-transparent"
                type="password"
                id="Passwrd"
                name="Passwrd"
                minLength={8}
                onChange={handleInput}
                required
              />

              <label className="font-semibold text-lg mb-2">
                Tipo de usuario
              </label>
              <select
                className="px-4 py-2 border-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-azulito focus:border-transparent"
                name="Rol"
                id="Rol"
                onChange={handleInput}
              >
                <option value="Mecanico">Mecánico</option>
                <option value="Administrador">Administrador</option>
              </select>
              <br></br>
              <br></br>

              <div className="flex justify-between">
                <button
                  className="px-28 py-2 bg-azulito hover:bg-blue-800 text-white rounded-lg cursor-pointer font-semibold mb-4 text-base"
                  type="submit"
                >
                  Registrar Usuario
                </button>
                <button
                  className="px-24 py-2 bg-rojo hover:bg-red-800 text-white rounded-lg cursor-pointer font-semibold mb-4 text-base"
                  onClick={closeModalReg}
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
