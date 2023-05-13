import Layout from "../../../components/Layout";
import TableComponent from "../../../components/TableComponent";
import { useRouter } from "next/router";
import { useGlobal } from "../../../context/GlobalProvider";
import { useEffect } from "react";

const titleUserTable = [
  {
    id: "usuario",
    name: "Usuario",
  },
  {
    id: "rol",
    name: "Rol",
  },
  {
    id: "institucion",
    name: "Institución",
  },
];

const Home = () => {
  const { auth, user, obtenerUsuarios } = useGlobal();
  const router = useRouter();
  useEffect(() => {
    obtenerUsuarios(auth.id_empresa);
  }, [auth.id_empresa, obtenerUsuarios]);
  return (
    <Layout>
      <button
        className="mb-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-right"
        onClick={() => {
          router.push("/dashboard/user/create");
        }}
      >
        Crear Usuario
      </button>
      {(auth.IdRol == 6 || auth.IdRol == 1) && (
        <TableComponent title={titleUserTable} data={user} />
      )}
    </Layout>
  );
};

export default Home;
