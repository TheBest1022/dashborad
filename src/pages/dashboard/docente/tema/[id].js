/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Layout from "../../../../components/Layout";
import { useRouter } from "next/router";
import { connectionUri } from "../../../../helpers/configuration";
import { useGlobal } from "../../../../context/GlobalProvider";

const Home = () => {
  const router = useRouter();
  const { auth, obtenerTemasCurso, theme } = useGlobal();

  const openPDF = (id, filename) => {
    if (id == 1) {
      window.open(`${connectionUri}api/docente/file/${filename}`, "_blank");
    }
    if (id == 4 || id == 7 || id == 6) {
      window.open(filename, "_blank");
    }
  };

  useEffect(() => {
    if (auth != null) {
      obtenerTemasCurso(auth.idDocente, router.query.id);
    }
  }, [obtenerTemasCurso, router.query.id]);
  return (
    <Layout>
      <ul actualizar="list" className="divide-y divide-gray-100">
        {theme.length != 0 ? (
          <>
            {theme.map(({ Descripcion, curso, idCurso, Pdf }, index) => (
              <li key={index} className="flex justify-between gap-x-6 py-6">
                <div className="flex gap-x-4">
                  <img
                    className="h-10 w-10 flex-none rounded-full bg-indigo-50"
                    src="https://www.dropbox.com/s/f6xs1wl26x6euvm/pdf.png?dl=1"
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p
                      className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer hover:text-sky-700"
                      onClick={() => openPDF(idCurso, Pdf)}
                    >
                      {curso}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {Descripcion}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <button className="text-sm leading-6 font-bold text-green-900">
                    Actualizar
                  </button>
                  <button className="text-sm leading-6 font-bold text-red-900">
                    Inhabilitar
                  </button>
                </div>
              </li>
            ))}
          </>
        ) : (
          <div className="ml-2 spinner"></div>
        )}
      </ul>
    </Layout>
  );
};

export default Home;
