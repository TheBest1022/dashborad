/* eslint-disable react-hooks/exhaustive-deps */
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
    if (auth != null) {
      obtenerUsuarios(auth.id_empresa);
    }
  }, [obtenerUsuarios]);
  return (
    <Layout>
      {auth != null && (
        <>
          {(auth.IdRol == 1 || auth.IdRol == 6) && (
            <button
              className="mb-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-right"
              onClick={() => {
                router.push("/dashboard/user/create");
              }}
            >
              Crear Usuario
            </button>
          )}{" "}
        </>
      )}

      {auth != null && (
        <>
          {(auth.IdRol == 6 || auth.IdRol == 1) && (
            <>
              {user.length != 0 ? (
                <TableComponent
                  title={titleUserTable}
                  data={user.filter(({estado,rol}) => (estado === 1 && rol != "Usuario"))}
                  section="user"
                />
              ) : (
                <div className="ml-2 spinner"></div>
              )}
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default Home;
