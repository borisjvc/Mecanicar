import React from "react";

function Registro() {
  return (
    <div className="mt-16 ml-200 mb-200 p-8">
      <h1 className="font-bold text-6xl text-center text-blue-900 mb-8">
        Registrate
      </h1>
      <form className="flex flex-col p-8 mx-64">
        <label className="font-bold mb-2" htmlFor="text">
          Usuario
        </label>
        <input
          className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-900"
          type="text"
          id="text"
          name="text"
          required
        />

        <label className="font-bold mb-2" htmlFor="email">
          Correo electrónico
        </label>
        <input
          className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-900"
          type="email"
          id="email"
          name="email"
          required
        />

        <label className="font-bold mb-2" htmlFor="password">
          Contraseña
        </label>
        <input
          className="px-4 py-2 border-2 rounded-lg mb-4 border-blue-900"
          type="password"
          id="password"
          name="password"
          required
        />

        <label className="font-bold mb-2" htmlFor="confirmPassword">
          Confirmar contraseña
        </label>
        <input
          className="px-4 py-2 border-2 rounded-lg mb-8 border-blue-900"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
        />

        <button
          className="px-16 py-2 bg-blue-900 text-white rounded-lg cursor-pointer text-xl self-center"
          type="submit"
        >
          Registrarse
        </button>
      </form>
      <p className="text-center mt-4">
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" className="font-bold text-blue-800 underline">
          Ingresa aquí
        </a>
      </p>
    </div>
  );
}

export default Registro;
