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
    id: "Descripción",
    name: "CURSO",
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

  useEffect(() => {
    obtenerDatosDocente(auth.id_empresa);
  }, [auth.id_empresa, obtenerDatosDocente]);

  useEffect(() => {
    if (auth.idDocente) {
      getCoursesForId(auth.idDocente);
    }
  }, [auth.idDocente, getCoursesForId]);
  return (
    <Layout>
      {auth.IdRol == 6 || auth.IdRol == 1 ? (
        <TableComponent title={title} data={docente} />
      ) : (
        <TableCourseComponent title={titleCourse} data={course} />
      )}
    </Layout>
  );
};

export default Home;
