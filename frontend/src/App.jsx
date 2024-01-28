import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registro from "./pages/registro";
import Iniciodesesion from "./pages/iniciodesesion";
import Inicio from "./pages/inicio";
import Servicios from "./pages/servicios";
import Gestionar from "./pages/gestionarservicio";
import Agregar from "./pages/agregarservicio";
import Editar from "./pages/editarservicio";
import Error from "./pages/error";
import VerticalDashboard from "./components/dashboard";
import Realizados from "./pages/serviciosrealizados";

function App() {
  const router = createBrowserRouter([
    {
      path: "/registro",
      element: <Registro />
    },
    {
      path: "/iniciodesesion",
      element: <Iniciodesesion/>
    },
    {
      path: "/",
      element: <Inicio />
    },
    {
      path: "/servicios",
      element: <Servicios/>
    },
    {
      path: "/gestionar",
      element: <Gestionar />
    },
    {
      path: "/editar",
      element: <Editar />
    },
    {
      path: "/agregar",
      element: <Agregar />
    },
    {
      path: "/realizados",
      element: <Realizados />
    },
    {
      path: "/*",
      element: <Error />
    }
  ])

  return (

    <div>
      <RouterProvider router={router} />
    </div>

  );
}

export default App;
