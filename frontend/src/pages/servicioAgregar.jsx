import React, { useState } from "react";
import { useFormik } from "formik";
import { FaSpinner } from "react-icons/fa";
import VerticalDashboard from "../components/dashboard";
import axios from "axios";
import Cookies from "js-cookie";

function Agregar() {
  const tipoTrabajoOptions = [
    "Reparación mecánica",
    "Reparación de chapa y pintura",
    "Revisión",
  ];
  const token = Cookies.get();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      Propietario: "",
      Modelo: "",
      Placas: "",
      Marca: "",
      tipoTrabajo: "",
      descripcion: "",
    },
    onSubmit: async (values, actions) => {
      try {
        setIsLoading(true);

        const { Propietario, Modelo, Placas, Marca, tipoTrabajo, descripcion } =
          values;

        // primero se agrega el vehiculo
        const res = await axios.post(
          "https://localhost:3001/vehiculos",
          {
            propietario: Propietario,
            marca: Marca,
            modelo: Modelo,
            placas: Placas,
          },
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );

        // posteriormente se agrega el servicio
        const mappedTipoTrabajo = tipoTrabajoOptions.indexOf(tipoTrabajo);
        await axios.post(
          "https://localhost:3001/trabajos",
          {
            descripcion: descripcion,
            tipo: mappedTipoTrabajo,
            vehiculo: res.data.idVehiculo,
          },
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );

        setIsLoading(false);
        actions.resetForm();
        alert("Datos agregados correctamente");
      } catch (error) {
        console.error("Error adding data:", error);
        setIsLoading(false);
      }
    },
    validate: (values) => {
      const errors = {};

      // Regex para validar que no contenga caracteres no permitidos
      const regex = /^(?!\s)(?!.*\s{2,})[\w ]+$/;

      if (!regex.test(values.Propietario)) {
        errors.Propietario = "El propietario no puede contener caracteres especiales y debe contener al menos un carácter distinto de espacio.";
      }

      if (!regex.test(values.Modelo)) {
        errors.Modelo = "El modelo no puede contener caracteres especiales y debe contener al menos un carácter distinto de espacio.";
      }

      if (!regex.test(values.Placas)) {
        errors.Placas = "Las placas no pueden contener caracteres especiales y debe contener al menos un carácter distinto de espacio.";
      }

      if (!regex.test(values.Marca)) {
        errors.Marca = "La marca no puede contener caracteres especiales y debe contener al menos un carácter distinto de espacio.";
      }

      if (!regex.test(values.descripcion)){
        errors.descripcion = "La descripción no puede contener caracteres especiales y debe contener al menos un carácter distinto de espacio.";
      }

      return errors;
    },
  });

  return (
    <>
      <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
        <VerticalDashboard />

        <main className="xl:col-span-5 bg-gray-50 p-10 h-[100vh]">
          <h1 className="text-4xl font-sans text-center font-bold mb-8">
            Agregar Servicio
          </h1>
          <br></br>
          <div className="flex justify-center">
            <div className="w-full lg:w-3/4 xl:w-2/3">
              <div className="bg-white shadow-xl rounded-lg p-6">
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                  <div>
                    <label
                      className="block text-lg font-semibold text-gray-700"
                      htmlFor="propietario"
                    >
                      Propietario
                    </label>
                    <input
                      type="text"
                      name="Propietario"
                      id="propietario"
                      className="mt-1 focus:ring-miniazul focus:border-miniazul block w-full shadow-sm sm:text-base border-azulito rounded-md p-2"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.Propietario}
                    />
                    {formik.errors.Propietario && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.Propietario}
                      </p>
                    )}
                  </div>
                  <br></br>
                  <div className="mb-4">
                    <label
                      className="block text-lg font-semibold text-gray-700"
                      htmlFor="marca"
                    >
                      Marca
                    </label>
                    <input
                      type="text"
                      name="Marca"
                      id="marca"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md p-2"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.Marca}
                    />
                    {formik.errors.Marca && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.Marca}
                      </p>
                    )}
                  </div>
                  <br></br>

                  <div>
                    <label
                      className="block text-lg font-semibold text-gray-700"
                      htmlFor="modelo"
                    >
                      Modelo
                    </label>
                    <input
                      type="text"
                      name="Modelo"
                      id="modelo"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md p-2"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.Modelo}
                    />
                    {formik.errors.Modelo && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.Modelo}
                      </p>
                    )}
                  </div>
                  <br></br>

                  <div>
                    <label
                      className="block text-lg font-semibold text-gray-700"
                      htmlFor="placas"
                    >
                      Placas
                    </label>
                    <input
                      type="text"
                      name="Placas"
                      id="placas"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md p-2"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.Placas}
                    />
                    {formik.errors.Placas && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.Placas}
                      </p>
                    )}
                  </div>
                  <br></br>

                  <div>
                    <label
                      className="block text-lg font-semibold text-gray-700"
                      htmlFor="tipoTrabajo"
                    >
                      Tipo
                    </label>
                    <select
                      id="tipoTrabajo"
                      name="tipoTrabajo"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md p-2"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.tipoTrabajo}
                    >
                      <option
                        value=""
                        className="font-bold text-gray-700 text-md"
                      >
                        Seleccionar tipo de trabajo
                      </option>
                      {tipoTrabajoOptions.map((tipo, index) => (
                        <option
                          key={index}
                          value={tipo}
                          className="font-medium text-gray-700 text-md"
                        >
                          {tipo}
                        </option>
                      ))}
                    </select>
                  </div>
                  <br></br>

                  <div>
                    <label
                      className="block text-lg font-semibold text-gray-700"
                      htmlFor="descripcion"
                    >
                      Descripción
                    </label>
                    <textarea
                      id="Descripcion"
                      name="descripcion"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md p-2"
                      required
                      maxLength={500}
                      onChange={formik.handleChange}
                      value={formik.values.descripcion}
                    ></textarea>
                    {formik.errors.descripcion && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.descripcion}
                      </p>
                    )}
                  </div>

                  <br></br>

                  <div className="flex items-center justify-center">
                    <button
                      className="bg-azulito hover:bg-blue-800 text-white text-lg font-semibold mb-4 p-3 px-4 rounded-lg flex items-center"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <FaSpinner className="animate-spin mr-2" />
                      ) : (
                        <span>Agregar Servicio</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Agregar;
