import Layout from "../../../components/Layout";
import React from "react";
import TableComponent from "../../../components/TableComponent";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGlobal } from "../../../context/GlobalProvider";
const titleCompanyTable = [
  {
    id: "Nombre",
    name: "Nombre",
  },
  {
    id: "Distrito",
    name: "Distrito",
  },
  {
    id: "Provincia",
    name: "Provincia",
  },
  {
    id: "Región",
    name: "Región",
  },
  {
    id: "Fecha",
    name: "Fecha",
  },
];
const index = () => {
  const { company, obtenerEscuela } = useGlobal();
  const router = useRouter();
  useEffect(() => {
    obtenerEscuela(company.id);
  }, [company.id, obtenerEscuela]);
  return (
    <Layout>
      <button
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => {
          router.push("/dashboard/empresa/add");
        }}
      >
        Registrar Colegio
      </button>
      <TableComponent title={titleCompanyTable} data={company} />
    </Layout>
  );
};

export default index;
