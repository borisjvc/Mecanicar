import React from 'react';
import VerticalDashboard from '../components/dashboard';

function Agregar() {
    return (
        <>
            <VerticalDashboard />
            <div className='flex flex-grow flex-col items-center'>

                <h1 className=' p-20 pr-[750px]  font-semibold text-4xl'>Agrega Servicio...</h1>
                <div className=''>
                    <form class=" w-[800px] h-[600px]">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-3xl font-semibold mb-2" for="propietario">
                                Propietario
                            </label>
                            <input type="text" name='Propietario' id="propietario" className=" border-2 border-blue-950 rounded-lg w-full py-4 px-3" ></input>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-3xl font-semibold mb-2" for="vehiculo">
                                Vehículo
                            </label>
                            <input type="text" name='Vehiculo' id="vehiculo" className="border-2 border-blue-950 rounded-lg w-full py-4 px-3 bg"></input>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-3xl font-semibold mb-2" for="placas">
                                Placas
                            </label>
                            <input type="text" name='Placas' id="placas" className="border-2 border-blue-950 rounded-lg w-full py-4 px-3"></input>
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-3xl font-semibold mb-2" for="servicio">
                                Servicio
                            </label>
                            <select id="Servicio" name='servicio' className="border-2 border-blue-950 rounded-lg w-full py-4">
                                <option value="" disabled selected></option>
                                <option className=' font-semibold text-gray-700 text-md'></option>
                            </select>
                        </div>
                        <div>
                            <label className='block text-gray-700 text-3xl font-semibold mb-2' for="descripcion">
                                Descripción
                            </label>
                            <textarea id='Descripcion' name='descripcion' className=' border-2 border-blue-950 rounded-lg w-full py-4 px-3 mb-3'></textarea>
                        </div>
                        <div class="flex items-center justify-center">
                            <button className="bg-blue-950 hover:bg-orange-500 text-white text-2xl font-semibold p-4 px-6 rounded-lg " type="onSubmit">
                                Agregar Servicio
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Agregar;