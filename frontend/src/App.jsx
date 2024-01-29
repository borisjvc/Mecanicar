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
import 'semantic-ui-css/semantic.min.css'

function App() {
  const router = createBrowserRouter([
    {
      path: "/registro",
      element: <Registro />
    },
    {
      path: "/login",
      element: <Login/>
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
