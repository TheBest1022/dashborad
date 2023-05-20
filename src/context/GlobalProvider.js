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
  const [theme, setTheme] = useState([]);
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
  const updateUser = async (id, user) => {
    return await axios.put(`${connectionUri}api/user/teach/${id}`, user);
  };
  const updateUserDirector = async (id, user) => {
    return await axios.put(`${connectionUri}api/user/director/${id}`, user);
  };
  const deleteUser = async (id)=>{
    return await axios.delete(`${connectionUri}api/user/${id}`);
  }
  const obtenerUsuarios = async (id) => {
    try {
      const { data } = await axios.get(`${connectionUri}api/admin/${id}/users`);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
    return;
  };
  const obtenerUsuarioId = async (id) => {
    try {
      return await axios.get(`${connectionUri}api/user/${id}`);
    } catch (error) {
      console.log(error);
    }
    return;
  };
  const obtenerUsuarioDocente = async (id) => {
    try {
      return await axios.get(`${connectionUri}api/user/teach/${id}`);
    } catch (error) {
      console.log(error);
    }
    return;
  };
  const obtenerUsuarioDirector = async (id) => {
    try {
      return await axios.get(`${connectionUri}api/user/director/${id}`);
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
  //TEMAS
  const createTema = async (data) => {
    return await axios.post(`${connectionUri}api/docente/tema`, data);
  };
  const obtenerTemasCurso = async (docente, curso) => {
    try {
      const { data } = await axios.get(
        `${connectionUri}api/course/${docente}/theme/${curso}`
      );
      setTheme(data);
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
      setAuth(data);
    } else {
      setAuth(null);
    }
  };
  const updateCompanyid = async (id, user) => {
    return await axios.put(`${connectionUri}api/company/${id}`, user);
  };
  const ObtenerEmpresaId = async (id) => {
    try {
      return await axios.get(`${connectionUri}api/company/${id}`);
    } catch (error) {
      console.log(error);
    }
    return;
  }

  useEffect(() => {
    checkLocalStorage();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        auth,
        user,
        course,
        theme,
        company,
        docente,
        SignIn,
        LogOut,
        setAuth,
        createUser,
        updateUser,
        obtenerUsuarios,
        obtenerUsuarioId,
        obtenerUsuarioDocente,
        obtenerUsuarioDirector,
        updateUserDirector,
        deleteUser,
        getCoursesForId,
        createTema,
        obtenerTemasCurso,
        createCompany,
        obtenerEscuela,
        obtenerDatosDocente,
        updateCompanyid,
        ObtenerEmpresaId
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
