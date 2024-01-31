import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registro from "./pages/registro";
import Inicio from "./pages/inicio";
import Login from "./pages/Login";
import Servicios from "./pages/servicios";
import Gestionar from "./pages/gestionarservicio";
import Agregar from "./pages/agregarservicio";
import Editar from "./pages/editarservicio";
import Error from "./pages/error";
import Realizados from "./pages/serviciosrealizados";
import ProtectedRoute from "./components/protectedRoutes";
import 'semantic-ui-css/semantic.min.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/registro",
      element: <ProtectedRoute element={<Registro />} path="/registro" />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Inicio />,
    },
    {
      path: "/servicios",
      element: <ProtectedRoute element={<Servicios />} path="/servicios" />,
    },
    {
      path: "/gestionar",
      element: <ProtectedRoute element={<Gestionar />} path="/gestionar" />,
    },
    {
      path: "/editar",
      element: <ProtectedRoute element={<Editar />} path="/editar" />,
    },
    {
      path: "/agregar",
      element: <ProtectedRoute element={<Agregar />} path="/agregar" />,
    },
    {
      path: "/realizados",
      element: <ProtectedRoute element={<Realizados />} path="/realizados" />,
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
