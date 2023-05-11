import Layout from "../../../components/Layout";
import React from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import TableComponent from "../../../components/TableComponent";
import { useRouter } from "next/router";
const title = [
  {
    id: "year",
    name: "Año",
  },
  {
    id: "dateInit",
    name: "Fecha Inicio",
  },
  {
    id: "dateEnd",
    name: "Fecha Final",
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
  const router = useRouter();
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
      <TableComponent title={title} data={dataOpen} />
    </Layout>
  );
};

export default Home;
