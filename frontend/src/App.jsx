import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registro from "./pages/admin/registro";
import Servicios from "./pages/admin/servicios";
import Usuarios from "./pages/admin/usuarios";

import Inicio from "./pages/inicio";
import Login from "./pages/Login";
import Gestionar from "./pages/ServiciosPendientes";
import Agregar from "./pages/servicioAgregar";
import Editar from "./pages/servicioEditar";
import Error from "./pages/error";
import Realizados from "./pages/serviciosFinalizados";
import ProtectedRoute from "./components/protectedRoutes";
import Recuperar from "./pages/recuperar";
import "semantic-ui-css/semantic.min.css";


//requiredRoles 1 es administrador, 0 es mecánico
function App() {
  const router = createBrowserRouter([
    {
      path: "/inicio",
      element: <ProtectedRoute
        element={<Inicio />}
        path="/inicio"
        requiredRoles={[0, 1]}
      />,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/servicios",
      element: (
        <ProtectedRoute
          element={<Servicios />}
          path="/servicios"
          requiredRoles={[1]}
        />
      ),
    },
    {
      path: "/gestionar",
      element: (
        <ProtectedRoute
          element={<Gestionar />}
          path="/gestionar"
          requiredRoles={[0, 1]}
        />
      ),
    },
    {
      path: "/editar",
      element: (
        <ProtectedRoute
          element={<Editar />}
          path="/editar"
          requiredRoles={[0, 1]}
        />
      ),
    },
    {
      path: "/agregar",
      element: (
        <ProtectedRoute
          element={<Agregar />}
          path="/agregar"
          requiredRoles={[0, 1]}
        />
      ),
    },
    {
      path: "/realizados",
      element: (
        <ProtectedRoute
          element={<Realizados />}
          path="/realizados"
          requiredRoles={[0, 1]}
        />
      ),
    },
    {
      path: "/usuarios",
      element: (
        <ProtectedRoute 
        element={<Usuarios/>}
        path="/usuarios"
        requiredRoles={[1]}
        />
      )
    },
    {
      path: "/*",
      element: <Error />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
