import React from 'react';
import VerticalDashboard from '../components/dashboard';
import axios from 'axios';
import { useFormik } from 'formik';

function Agregar() {
    const formik = useFormik({
        initialValues: {
            Propietario: "",
            Vehiculo: "",
            Placas: "",
            Marca: "",
            Coste: "",
            servicio: "",
            descripcion: "",
        },
        onSubmit: async (values, actions) => {
            try {
                console.log(values);
                await axios.post('http://localhost:3001/vehiculos', values);
                actions.resetForm();
                alert('Datos agregados correctamente');
                
            } catch (error) {
                console.error('Error adding data:', error);
            }
        },
    });

    return (
        <>
            <VerticalDashboard />

            <div className='flex flex-grow flex-col items-center'>
                <h1 className='p-20 pr-[750px] font-semibold text-4xl'>Agrega Servicio...</h1>

                <div className=''>
                    <h2 className='text-gray-700 text-3xl font-semibold mb-5'>Agregar Vehiculos</h2>
                    <form className="w-[500px] h-[600px]" onSubmit={formik.handleSubmit}>
                        <div className='flex flex-row'>
                            <div className="mb-4 pr-5">
                                <label className="block text-gray-700 text-2xl font-semibold mb-2" htmlFor="propietario">
                                    Propietario
                                </label>
                                <input
                                    type="text"
                                    name='Propietario'
                                    id="propietario"
                                    className="border-2 border-blue-950 rounded-lg w-full py-1 px-2"
                                    onChange={formik.handleChange}
                                    value={formik.values.Propietario}
                                />
                            </div>
                            <div className="mb-4 pr-5">
                                <label className="block text-gray-700 text-2xl font-semibold mb-2" htmlFor="vehiculo">
                                    Modelo
                                </label>
                                <input
                                    type="text"
                                    name='Vehiculo'
                                    id="vehiculo"
                                    className="border-2 border-blue-950 rounded-lg w-full py-1 px-2"
                                    onChange={formik.handleChange}
                                    value={formik.values.Vehiculo}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-2xl font-semibold mb-2" htmlFor="placas">
                                    Placas
                                </label>
                                <input
                                    type="text"
                                    name='Placas'
                                    id="placas"
                                    className="border-2 border-blue-950 rounded-lg w-full py-1 px-2"
                                    onChange={formik.handleChange}
                                    value={formik.values.Placas}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className="mb-4 pr-5">
                                <label className="block text-gray-700 text-2xl font-semibold mb-2" htmlFor="marca">
                                    Marca
                                </label>
                                <input
                                    type="text"
                                    name='Marca'
                                    id="marca"
                                    className="border-2 border-blue-950 rounded-lg w-full py-1 px-2"
                                    onChange={formik.handleChange}
                                    value={formik.values.Marca}
                                />
                            </div>
                        </div>
                        <h3 className='text-gray-700 text-3xl font-semibold mb-5 mt-5'>Agregar Trabajo</h3>
                        <div className='flex flex-row'>
                            <div className='mb-4 pr-5'>
                                <label className="block text-gray-700 text-2xl font-semibold mb-2" htmlFor="coste">
                                    Coste
                                </label>
                                <input
                                    type='number'
                                    name='Coste'
                                    id='coste'
                                    className='border-2 border-blue-950 rounded-lg mb-2 py-1 px-2'
                                    onChange={formik.handleChange}
                                    value={formik.values.Coste}
                                />
                                <div className='mb-2'>
                                    <label className="block text-gray-700 text-2xl font-semibold mb-2" htmlFor="servicio">
                                        Tipo
                                    </label>
                                    <select
                                        id="Servicio"
                                        name='servicio'
                                        className="border-2 border-blue-950 rounded-lg py-1 px-2"
                                        onChange={formik.handleChange}
                                        value={formik.values.servicio}
                                    >
                                        <option value="" disabled selected></option>
                                        <option className='font-semibold text-gray-700 text-md'>Reparaciones</option>
                                        <option className='font-semibold text-gray-700 text-md'>Mantenimiento</option>
                                        <option className='font-semibold text-gray-700 text-md'>Opcion 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className='block text-gray-700 text-2xl font-semibold mb-2' htmlFor="descripcion">
                                Descripción
                            </label>
                            <textarea
                                id='Descripcion'
                                name='descripcion'
                                className='border-2 border-blue-950 rounded-lg w-full py-1 px-2 mb-3'
                                onChange={formik.handleChange}
                                value={formik.values.descripcion}
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-blue-950 hover:bg-orange-500 text-white text-2xl font-semibold p-3 px-4 rounded-lg"
                                type="submit">Agregar Servicio</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Agregar;
