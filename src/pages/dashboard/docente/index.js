/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "../../../components/Layout";
import { useEffect } from "react";
import TableComponent from "../../../components/TableComponent";
import TableCourseComponent from "../../../components/table/TableCourseComponent";
import { useRouter } from "next/router";
import { useGlobal } from "../../../context/GlobalProvider";
const title = [
  {
    id: "documento",
    name: "DNI",
  },
  {
    id: "Nombre",
    name: "NOMBRES",
  },
  {
    id: "Apellido",
    name: "APELLIDOS",
  },
  {
    id: "empresa",
    name: "Institución",
  },
];
const titleCourse = [
  {
    id: "curso",
    name: "Curso",
  },
];
const Home = () => {
  const router = useRouter();
  const { auth, docente, obtenerDatosDocente, course, getCoursesForId } =
    useGlobal();

  const renderTable = () => {
    if (auth != null) {
      if (auth.IdRol == 6 || auth.IdRol == 1) {
        return (
          <>
            {docente.length != 0 ? (
              <TableComponent title={title} data={docente.filter(({estado})=> estado == 1)} />
            ) : (
              <div className="ml-2 spinner"></div>
            )}
          </>
        );
      } else {
        return (
          <>
            {" "}
            {course.length != 0 ? (
              <TableCourseComponent title={titleCourse} data={course} />
            ) : (
              <div className="ml-2 spinner"></div>
            )}{" "}
          </>
        );
      }
    }
  };

  useEffect(() => {
    if (auth != null) {
      obtenerDatosDocente(auth.id_empresa);
    }
  }, [obtenerDatosDocente]);

  useEffect(() => {
    if (auth != null) {
      getCoursesForId(auth.idDocente);
    }
  }, []);
  return (
    <Layout>
      {auth != null && (
        <>
          {auth.IdRol == 5 && (
            <button
              className="mb-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-right"
              onClick={() => {
                router.push("/dashboard/docente/tema/create");
              }}
            >
              Crear Tema
            </button>
          )}
        </>
      )}

      <br />
      {renderTable()}
    </Layout>
  );
};

export default Home;
