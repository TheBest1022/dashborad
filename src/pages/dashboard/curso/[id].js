import React from "react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";

const people = [
  {
    curso: "Estimulacion Visual", // Curso
    tema: "El Cuerpo Humano", // Tema
    actualizar: "Actualizar", // Actualizar PDf + Nombre
    imageUrl: "https://www.dropbox.com/s/f6xs1wl26x6euvm/pdf.png?dl=1", // Imagen definida
    deshabilitar: "Deshabilitar", // Deshabilitar tema
    lastSeenDateTime: "2023-01-23T13:23Z", // Horas x las
  },
  {
    curso: "Estimulacion Visual", // Curso
    tema: "Los Animales", // Tema
    actualizar: "Actualizar", // Actualizar PDf + Nombre
    imageUrl: "https://www.dropbox.com/s/f6xs1wl26x6euvm/pdf.png?dl=1", // Imagen definida
    deshabilitar: "Deshabilitar", // Deshabilitar tema
    lastSeenDateTime: "2023-01-23T13:23Z", // Horas x las
  },
  {
    curso: "Estimulacion Visual", // Curso
    tema: "Derivado de Animales", // Tema
    actualizar: "Actualizar", // Actualizar PDf + Nombre
    imageUrl: "https://www.dropbox.com/s/f6xs1wl26x6euvm/pdf.png?dl=1", // Imagen definida
    deshabilitar: "Deshabilitar", // Deshabilitar tema
    lastSeenDateTime: "2023-01-23T13:23Z", // Horas x las
  },
  {
    curso: "Estimulacion Visual", // Curso
    tema: "El Semaforo", // Tema
    actualizar: "Actualizar", // Actualizar PDf + Nombre
    imageUrl: "https://www.dropbox.com/s/f6xs1wl26x6euvm/pdf.png?dl=1", // Imagen definida
    deshabilitar: "Deshabilitar", // Deshabilitar tema
    lastSeenDateTime: "2023-01-23T13:23Z", // Horas x las
  },
  {
    curso: "Estimulacion Visual", // Curso
    tema: "El Abecedario", // Tema
    actualizar: "Actualizar", // Actualizar PDf + Nombre
    imageUrl: "https://www.dropbox.com/s/f6xs1wl26x6euvm/pdf.png?dl=1", // Imagen definida
    deshabilitar: "Deshabilitar", // Deshabilitar tema
    lastSeenDateTime: "2023-01-23T13:23Z", // Horas x las
  },
  {
    curso: "Estimulacion Visual", // Curso
    tema: "Los Medios de Comunicacion", // Tema
    actualizar: "Actualizar", // Actualizar PDf + Nombre
    imageUrl: "https://www.dropbox.com/s/f6xs1wl26x6euvm/pdf.png?dl=1", // Imagen definida
    deshabilitar: "Deshabilitar", // Deshabilitar tema
    lastSeenDateTime: "2023-01-23T13:23Z", // Horas x las
  },
];

const Home = () => {
const router = useRouter();
  return (
    <Layout>
      <button
        className="mb-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-right"
        onClick={() => {
          router.push("/dashboard/curso/create");
        }}
      >
        Crear Curso
      </button>
      <ul actualizar="list" className="divide-y divide-gray-100">
        {people.map((person) => (
          <li key={person.tema} className="flex justify-between gap-x-6 py-6">
            <div className="flex gap-x-4">
              <img
                className="h-10 w-10 flex-none rounded-full bg-indigo-50"
                src={person.imageUrl}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {person.curso}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {person.tema}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <button className="text-sm leading-6 font-bold text-green-900">
                {person.actualizar}
              </button>
              <button className="text-sm leading-6 font-bold text-red-900">
                {person.deshabilitar}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Home;
