import Layout from "@/components/Layout";
import { useEffect } from "react";
import TableComponent from "@/components/TableComponent";
import { useRouter } from "next/router";
import { useGlobal } from "@/context/GlobalProvider";
const title = [
  {
    id: "Nombre",
    name: "Nombre",
  },
  {
    id: "empresa",
    name: "Institución",
  },
  {
    id: "fecha",
    name: "Fecha Evl.",
  },
  {
    id: "Pt. Total",
    name: "Puntuación",
  },
];
const Home = () => {
  const router = useRouter();
  const { auth, docente } = useGlobal();
  const renderTable = () => {
    if (auth != null) {
      if (auth.IdRol == 8 || auth.IdRol == 1) {
        return (
          <>
            {docente.length != 0 ? (
              <TableComponent
                title={title}
                data={docente.filter(({ estado }) => estado == 1)}
              />
            ) : (
              <>
                <p className="text-xl mt-5">No existen Registros</p>
                <div className="ml-2 spinner"></div>
              </>
            )}
          </>
        );
      } else {
      }
    }
  };
  return (
    <Layout>
      {auth != null && (
        <>
          {auth.IdRol == 8 && (
            <>
              <button
                className="mb-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-right"
                onClick={() => {
                  router.push("/dashboard/psicologo/tema/create");
                }}
              >
                Generar Reporte
              </button>
              {renderTable()}
            </>
          )}
        </>
      )}

      <br />
    </Layout>
  );
};

export default Home;
