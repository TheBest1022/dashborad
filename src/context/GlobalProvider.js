import { useContext, useState} from "react";
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
  const [docente, setDocente] = useState([]);
  const [company, setCompany] = useState([]);
  //INGRESAR
  const SignIn = async (user) => {
    return await axios.post(`${connectionUri}api/auth`, user);
  };
  //SALIDA
  const LogOut = () => {
    setAuth(null);
  };
  // USUARIOS
  const createUser = async (user) => {
    return await axios.post(`${connectionUri}api/admin/register`, user)
  }
  //DOCENTES
  const obtenerDatosDocente = async (id) => {
    try {
      const { data } = await axios.get(`${conexionURL}api/docente/names/${id}`);
      setDocente(data);
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
  return (
    <GlobalContext.Provider
      value={{
        auth,
        company,
        docente,
        SignIn,
        LogOut,
        setAuth,
        createUser,
        obtenerEscuela,
        obtenerDatosDocente
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
