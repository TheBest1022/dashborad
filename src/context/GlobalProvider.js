import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import { connectionUri } from "../helpers/configuration";

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useApps must be used within a GlobalContextProvider");
  }
  return context;
};

export const GlobalContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState([]);
  const [docente, setDocente] = useState([]);
  const [course, setCourse] = useState([]);
  const [company, setCompany] = useState([]);
  //INGRESAR
  const SignIn = async (user) => {
    return await axios.post(`${connectionUri}api/auth`, user);
  };
  //SALIDA
  const LogOut = () => {
    localStorage.removeItem("auth");
  };
  // USUARIOS
  const createUser = async (user) => {
    return await axios.post(`${connectionUri}api/admin/register`, user);
  };
  const obtenerUsuarios = async (id) => {
    try {
      const { data } = await axios.get(`${connectionUri}api/admin/${id}/users`);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
    return;
  };
  //DOCENTES
  const obtenerDatosDocente = async (id) => {
    try {
      const { data } = await axios.get(
        `${connectionUri}api/docente/names/${id}`
      );
      setDocente(data);
    } catch (error) {
      console.log(error);
    }
  };
  //CURSOS
  const getCoursesForId = async (id) => {
    try {
      const { data } = await axios.get(
        `${connectionUri}api/course/docente/${id}`
      );
      setCourse(data);
    } catch (error) {
      console.log(error);
    }
  };
  //ESCUELAS
  const obtenerEscuela = async () => {
    try {
      const { data } = await axios.get(`${connectionUri}api/company`);
      setCompany(data);
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const createCompany = async (data) => {
    return await axios.post(`${connectionUri}api/company`, data);
  };

  const checkLocalStorage = () => {
    const storedAuth = localStorage.getItem("auth");

    if (storedAuth !== null) {
      const data = JSON.parse(storedAuth);
      console.log(data);
      setAuth(data);
    } else {
      setAuth(null);
    }
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        auth,
        user,
        course,
        company,
        docente,
        SignIn,
        LogOut,
        setAuth,
        createUser,
        obtenerUsuarios,
        getCoursesForId,
        createCompany,
        obtenerEscuela,
        obtenerDatosDocente,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
