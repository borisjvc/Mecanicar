import VerticalDashboard from "../../components/dashboard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PiPlusBold } from "react-icons/pi";
import axios from "axios";
import Cookies from "js-cookie";
//TODO: Mejorar el modal para cerrarlo
export default function Usuarios() {
  const token = Cookies.get();
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    Name: "",
    Apellido: "",
    Email: "",
    Passwrd: "",
    Rol: "Mecanico",
  });

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("https://localhost:3001/usuarios", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      //filtrar para solo mostrar usuarios que no hayan sido eliminados
      const usuariosFiltrados = response.data.filter(
        (users) => users.activo === 1
      );
      setUsuarios(usuariosFiltrados);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleEditar = (userId) => {
    const selected = usuarios.find((user) => user.idUsuario === userId);
    setSelectedUser(selected);
    setShowModal(true);
    setFormValues({
      Name: selected.nombre || "",
      Apellido: selected.apellido || "",
      Email: selected.correo || "",
      Passwrd: "Mecanicar2024",
      Rol: getRolTexto(selected.rol),
    });
  };

  const handleEliminar = async (userId) => {
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const mappedRolValue =
      formValues.Rol === "Mecanico" || formValues.Rol === "Mecánico" ? 0 : 1;
    if (
      !formValues.Name ||
      !formValues.Apellido ||
      !formValues.Email ||
      !formValues.Passwrd
    ) {
      console.error("Formulario incompleto");
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

    closeModal();
    fetchUsuarios();
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const getRolTexto = (rol) => {
    return rol === 1 ? "Administrador" : "Mecánico";
  };

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <VerticalDashboard />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
        <h1 className="text-4xl font-bold mb-8">Gestión de usuarios</h1>

        {/* Section 2 */}
        <section className="grid grid-cols-1 md:grid-cols-1 mt-10 gap-8">
          <div>
            <Link to="/registro">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mb-4 flex items-center">
                <PiPlusBold className="mr-2" /> Crear nuevo usuario
              </button>
            </Link>
            {/* Table */}
            <div className="bg-miniazul p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
              <table className="w-full border-collapse">
                <thead className="bg-blue-950 text-white">
                  <tr>
                    <th className="font-bold text-center py-2">Nombre</th>
                    <th className="font-bold text-center py-2">Apellido</th>
                    <th className="font-bold text-center py-2">Correo</th>
                    <th className="font-bold text-center py-2">Rol</th>
                    <th className="font-bold text-center py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr
                      key={usuario.idUsuario}
                      className="hover:bg-blue-300  transition-all"
                    >
                      <td className="text-center py-3">{usuario.nombre}</td>
                      <td className="text-center py-3">{usuario.apellido}</td>
                      <td className="text-center py-3">{usuario.correo}</td>
                      <td className="text-center py-3">
                        {getRolTexto(usuario.rol)}
                      </td>
                      <td className="text-center py-3 space-x-2">
                        <button
                          className="bg-amber-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-all"
                          onClick={() => handleEditar(usuario.idUsuario)}
                        >
                           Editar
                        </button>
                        <button
                          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md transition-all"
                          onClick={() => handleEliminar(usuario.idUsuario)}
                        >
                        Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl">
            <form className="flex flex-col p-16 mx-8" onSubmit={handleUpdate}>
              <label className="font-bold mb-2">Nombre</label>
              <input
                className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-950"
                type="text"
                id="Name"
                name="Name"
                placeholder="Nombre"
                required
                onChange={handleInputChange}
                value={formValues.Name}
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
                value={formValues.Apellido}
              />

              <label className="font-bold mb-2">Correo electrónico</label>
              <input
                className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-950"
                type="email"
                id="Email"
                name="Email"
                placeholder="usuario@email.com"
                required
                onChange={handleInputChange}
                value={formValues.Email}
              />

              <label className="font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-900"
                type="password"
                id="Passwrd"
                name="Passwrd"
                placeholder="*********"
                minLength={8}
                onChange={handleInputChange}
                value={formValues.Passwrd}
                required
              />

              <label className="font-bold mb-2">Tipo de usuario</label>
              <select
                className="px-4 py-2 border-2 rounded-lg mb-8 border-blue-950"
                name="Rol"
                id="Rol"
                onChange={handleInputChange}
                value={formValues.Rol}
              >
                <option value="Mecanico">Mecánico</option>
                <option value="Administrador">Administrador</option>
              </select>

              <button
                className="px-16 py-2 bg-blue-950 text-white rounded-lg cursor-pointer text-xl self-center hover:bg-blue-900"
                type="submit"
              >
                Enviar cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
