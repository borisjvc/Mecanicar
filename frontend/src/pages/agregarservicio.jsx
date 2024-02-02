import React from "react";
import VerticalDashboard from "../components/dashboard";
import axios from "axios";
import { useFormik } from "formik";

function Agregar() {
  const formik = useFormik({
    initialValues: {
      Propietario: "",
      Modelo: "",
      Placas: "",
      Marca: "",
      costoMaterial: 0,
      tipoTrabajo: "",
      descripcion: "",
    },
    onSubmit: async (values, actions) => {
      try {
        const { Propietario, Modelo, Placas, Marca } = values;
        
        //primero se agrega el vehiculo
        await axios.post("https://localhost:3001/vehiculos", {
          nombre: Propietario, 
          marca: Marca,
          modelo: Modelo, 
          placas: Placas,
        });

        //posteriormente se agrega el servicio aqui abajo

        actions.resetForm();
        alert("Datos agregados correctamente");
      } catch (error) {
        console.error("Error adding data:", error);
      }
    },
  });

  return (
    <>
      <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
        <VerticalDashboard />

        <div className="flex flex-col flex-grow items-center mx-auto ">
          <h1 className="p-20 pr-[750px] font-semibold text-4xl">
            Agregar Servicio
          </h1>

          <div className="">
            <h2 className="text-gray-700 text-3xl font-semibold mb-5">
              Agregar Vehiculos
            </h2>
            <form
              className="w-[500px] h-[600px]"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-row">
                <div className="mb-4 pr-5">
                  <label
                    className="block text-gray-700 text-2xl font-semibold mb-2"
                    htmlFor="propietario"
                  >
                    Propietario
                  </label>
                  <input
                    type="text"
                    name="Propietario"
                    id="propietario"
                    className="border-2 border-blue-950 rounded-lg w-full py-1 px-2"
                    onChange={formik.handleChange}
                    value={formik.values.Propietario}
                  />
                </div>
                <div className="mb-4 pr-5">
                  <label
                    className="block text-gray-700 text-2xl font-semibold mb-2"
                    htmlFor="modelo"
                  >
                    Modelo
                  </label>
                  <input
                    type="text"
                    name="Modelo"
                    id="modelo"
                    className="border-2 border-blue-950 rounded-lg w-full py-1 px-2"
                    onChange={formik.handleChange}
                    value={formik.values.Modelo}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-2xl font-semibold mb-2"
                    htmlFor="placas"
                  >
                    Placas
                  </label>
                  <input
                    type="text"
                    name="Placas"
                    id="placas"
                    className="border-2 border-blue-950 rounded-lg w-full py-1 px-2"
                    onChange={formik.handleChange}
                    value={formik.values.Placas}
                  />
                </div>
              </div>
              <div className="flex flex-row">
                <div className="mb-4 pr-5">
                  <label
                    className="block text-gray-700 text-2xl font-semibold mb-2"
                    htmlFor="marca"
                  >
                    Marca
                  </label>
                  <input
                    type="text"
                    name="Marca"
                    id="marca"
                    className="border-2 border-blue-950 rounded-lg w-full py-1 px-2"
                    onChange={formik.handleChange}
                    value={formik.values.Marca}
                  />
                </div>
              </div>
              <h3 className="text-gray-700 text-3xl font-semibold mb-5 mt-5">
                Agregar Trabajo
              </h3>
              <div className="flex flex-row">
                <div className="mb-4 pr-5">
                  <label
                    className="block text-gray-700 text-2xl font-semibold mb-2"
                    htmlFor="costoMaterial"
                  >
                    Coste
                  </label>
                  <input
                    type="number"
                    name="CostoMaterial"
                    id="costoMaterial"
                    className="border-2 border-blue-950 rounded-lg mb-2 py-1 px-2"
                    onChange={formik.handleChange}
                    value={formik.values.costoMaterial}
                  />
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-2xl font-semibold mb-2"
                      htmlFor="tipoTrabajo"
                    >
                      Tipo de Trabajo
                    </label>
                    <select
                      id="Tipotrabajo"
                      name="tipotrabajo"
                      className="border-2 border-blue-950 rounded-lg py-1 px-2"
                      onChange={formik.handleChange}
                      value={formik.values.tipoTrabajo}
                    >
                      <option value=""></option>
                      <option className="font-semibold text-gray-700 text-md">
                        Reparación
                      </option>
                      <option className="font-semibold text-gray-700 text-md">
                        Mecánica
                      </option>
                      <option className="font-semibold text-gray-700 text-md">
                        Reparación de chapa y pintura
                      </option>
                      <option className="font-semibold text-gray-700 text-md">
                        Revisión
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-2xl font-semibold mb-2"
                  htmlFor="descripcion"
                >
                  Descripción
                </label>
                <textarea
                  id="Descripcion"
                  name="descripcion"
                  className="border-2 border-blue-950 rounded-lg w-full py-1 px-2 mb-3"
                  onChange={formik.handleChange}
                  value={formik.values.descripcion}
                ></textarea>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-950 hover:bg-orange-500 text-white text-2xl font-semibold p-3 px-4 rounded-lg"
                  type="submit"
                >
                  Agregar Servicio
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Agregar;
