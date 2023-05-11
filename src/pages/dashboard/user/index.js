import Layout from "../../../components/Layout";
import React from "react";
import TableComponent from "../../../components/TableComponent";
import { useRouter } from "next/router";
import { useGlobal } from "../../../context/GlobalProvider";
import { useEffect } from "react";
const item = [
  {
    id: "Nombre",
    name: "Nombre",
  },
  {
    id: "Apellido",
    name: "Apellido",
  },
  {
    id: "Rol",
    name: "Rol",
  },
  {
    id: "Curso",
    name: "Curso",
  },
  {
    id: "Empresa",
    name: "Empresa",
  },
];
const dataOpen = [
  {
    id: "1",
    year: "2023",
    dateInit: "14/04/2023",
    dateEnd: "14/12/2023",
  },
  {
    id: "2",
    year: "2023",
    dateInit: "14/04/2023",
    dateEnd: "14/12/2023",
  },
  {
    id: "3",
    year: "2023",
    dateInit: "14/04/2023",
    dateEnd: "14/12/2023",
  },
  {
    id: "4",
    year: "2023",
    dateInit: "14/04/2023",
    dateEnd: "14/12/2023",
  },
  {
    id: "5",
    year: "2023",
    dateInit: "14/04/2023",
    dateEnd: "14/12/2023",
  },
  {
    id: "6",
    year: "2023",
    dateInit: "14/04/2023",
    dateEnd: "14/12/2023",
  },
];
const Home = () => {
  const {auth, docente, obtenerDatosDocente} = useGlobal();
  const router = useRouter();
  useEffect(() => {
    obtenerDatosDocente(auth);
  }, []);
  return (
    <Layout>
      <button
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => {
          router.push("/dashboard/user/add");
        }}
      >
        Registrar Director
      </button>
      <TableComponent title={item} data={dataOpen} />
    </Layout>
  );
};

export default Home;
