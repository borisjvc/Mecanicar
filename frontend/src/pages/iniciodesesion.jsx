import { Link } from "react-dom";

export default function Login() {
  return (
    <>
      <div className="mt-16 ml-200 mb-200 p-8">
        <h1 className="font-bold text-6xl text-center text-blue-950 mb-8">
          Inicia sesión
        </h1>
        <form className="flex flex-col p-8 mx-64">
          <label className="font-bold mb-2" htmlFor="email">
            Correo electrónico
          </label>
          <input
            className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-950"
            type="email"
            id="email"
            name="email"
            required
          />

          <label className="font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-950"
            type="password"
            id="password"
            name="password"
            required
          />
          <p className="text-center mt-4 mb-6">
            ¿Olvidaste tu contraseña?{" "}
            <a href="/recuperar" className="font-bold text-blue-800 underline">
              Recupérala
            </a>
          </p>

          <button
            className="px-16 py-2 bg-blue-950 text-white rounded-lg cursor-pointer text-xl self-center hover:bg-blue-900"
            type="submit"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="text-center">
          ¿Deseas registrarte?{" "}
          <a href="/registro" className="font-bold text-blue-800 underline">
            Hazlo aquí
          </a>
        </p>
      </div>
    </>
  );
}
