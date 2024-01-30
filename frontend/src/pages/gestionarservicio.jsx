import React from 'react';
import VerticalDashboard from '../components/dashboard';

function Gestionar() {
    return (
        <>
            <div className="flex flex-grow h-screen">
                <VerticalDashboard />
                <h1 className=' p-20 font-semibold text-4xl'>Gestión de Servicio</h1>
            </div>
        </>
    );
}
export default Gestionar;