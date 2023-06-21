import Layout from "@/components/Layout";
import { useEffect } from "react";
import TableComponent from "@/components/TableComponent";
import TableCourseComponent from "../../../components/table/TableCourseComponent";
import { useRouter } from "next/router";
import { useGlobal } from "@/context/GlobalProvider";
const title = [
  {
    id: "apoderado",
    name: "apoderado",
  },
  {
    id: "institucion",
    name: "institucion",
  },
  {
    id: "Total",
    name: "Total",
  },
  {
    id: "fecha_evaluación",
    name: "fecha_evaluación.",
  },
];
const Home = () => {
  const router = useRouter();
  const { auth, obtenerStudents, student } = useGlobal();
  console.log(student);
  const renderTable = () => {
    if (auth != null) {
      if (auth.IdRol == 1 || auth.IdRol == 8) {
        return (
          <>
            {student.length != 0 ? (
              <TableComponent
                title={title}
                data={student.filter(({ estado }) => estado == 1)}
              />
            ) : (
              <div className="ml-2 spinner"></div>
            )}
          </>
        );
      } else {
        return (
          <>
            {course.length != 0 ? (
              <TableCourseComponent title={titleCourse} data={course} />
            ) : (
              <div className="ml-2 spinner"></div>
            )}
          </>
        );
      }
    }
  };
  useEffect(() => {
    if (auth != null) {
      obtenerStudents(auth.id_empresa);
    }
  }, [obtenerStudents]);
  return (
    <Layout>
      {auth != null && (
        <>
          {auth.IdRol == 8 && (
            <button
              className="mb-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-right"
              onClick={() => {
                router.push("/dashboard/docente/tema/create");
              }}
            >
              Reporte
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
