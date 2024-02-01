import React from 'react';
import VerticalDashboard from '../components/dashboard';

function Agregar() {
    return (
        <>
            <VerticalDashboard />
            <div className='flex flex-grow flex-col items-center'>

                <h1 className=' p-20 pr-[750px] font-semibold text-4xl'>Agrega Servicio...</h1>

                <div className=''>
                    <h2 className=' text-gray-700 text-3xl font-semibold mb-5'> Agregar Vehiculos</h2>
                    <form class=" w-[500px] h-[600px]">
                        <div className=' flex flex-row'>
                            <div class="mb-4 pr-5">
                                <label class="block text-gray-700 text-2xl font-semibold mb-2" for="propietario">
                                    Propietario
                                </label>
                                <input type="text" name='Propietario' id="propietario" className=" border-2 border-blue-950 rounded-lg w-full py-1 px-2" ></input>
                            </div>
                            <div class="mb-4 pr-5">
                                <label class="block text-gray-700 text-2xl font-semibold mb-2" for="vehiculo">
                                    Modelo
                                </label>
                                <input type="text" name='Vehiculo' id="vehiculo" className="border-2 border-blue-950 rounded-lg w-full py-1 px-2 "></input>
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-2xl font-semibold mb-2" for="placas">
                                    Placas
                                </label>
                                <input type="text" name='Placas' id="placas" className="border-2 border-blue-950 rounded-lg w-full py-1 px-2"></input>
                            </div>
                        </div>
                        <div className=' flex flex-row'>
                            <div class="mb-4 pr-5">
                                <label class="block text-gray-700 text-2xl font-semibold mb-2" for="marca">
                                    Marca
                                </label>
                                <input type="text" name='Marca' id="marca" className="border-2 border-blue-950 rounded-lg w-full py-1 px-2"></input>
                            </div>
                        </div>
                        <h3 className=' text-gray-700 text-3xl font-semibold mb-5 mt-5'> Agregar Trabajo</h3>
                        <div className=' flex flex-row'>
                            <div className='mb-4 pr-5'>
                                <label class="block text-gray-700 text-2xl font-semibold mb-2" for="coste">
                                    Coste
                                </label>
                                <input type='number' name='Coste' id='coste' className=' border-2 border-blue-950 rounded-lg mb-2 py-1 px-2'></input>
                                <div className=' mb-2 '>
                                    <label className="block text-gray-700 text-2xl font-semibold mb-2" for="servicio">
                                        Tipo
                                    </label>
                                    <select id="Servicio" name='servicio' className=" border-2 border-blue-950 rounded-lg py-1 px-2">
                                        <option value="" disabled selected></option>
                                        <option className=' font-semibold text-gray-700 text-md'> Reparaciones</option>
                                        <option className=' font-semibold text-gray-700 text-md'> Mantenimiento</option>
                                        <option className=' font-semibold text-gray-700 text-md'> Opcion 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className='block text-gray-700 text-2xl font-semibold mb-2' for="descripcion">
                                Descripción
                            </label>
                            <textarea id='Descripcion' name='descripcion' className=' border-2 border-blue-950 rounded-lg w-full py-1 px-2 mb-3'></textarea>
                        </div>
                        <div class="flex items-center justify-center">
                            <button className="bg-blue-950 hover:bg-orange-500 text-white text-2xl font-semibold p-3 px-4 rounded-lg " type="onSubmit">
                                Agregar Servicio
                            </button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    );
}
export default Agregar;