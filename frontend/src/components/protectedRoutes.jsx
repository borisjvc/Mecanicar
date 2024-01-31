import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const ProtectedRoute = ({ element, path, requiredRoles }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userRoles, setUserRoles] = useState(null);
  const navigate = useNavigate();
  const token = Cookies.get();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Hacer una solicitud al servidor para validar el token
        const response = await axios.get(
          "https://localhost:3001/usuarios/validateToken",
          {
            headers: {
              Authorization: "Bearer " + token.token,
            },
          }
        );

        // Si la respuesta es exitosa, el token es válido
        if (response.status === 200) {
          setAuthenticated(true);
          setUserRoles(response.data.user.rol);
        }
      } catch (error) {
        console.error("Error al validar el token", error);
        setAuthenticated(false);
        navigate("/login"); // Redireccionar a la página de inicio de sesión
      }
    };

    checkAuth();
  }, [token, navigate]);

  // Función para verificar si el usuario tiene roles requeridos
  const hasRequiredRoles = () => {
    if (userRoles === 1)
      return true;
    else
      navigate("/login");
  };
  return isAuthenticated && hasRequiredRoles() ? element : null;
};

export default ProtectedRoute;
