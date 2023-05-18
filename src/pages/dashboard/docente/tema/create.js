/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useGlobal } from "../../../../context/GlobalProvider";
import { connectionUri } from "../../../../helpers/configuration";

const Create = () => {
  const router = useRouter();
  const { auth, createTema, getCoursesForId, course } = useGlobal();
  const [theme, setTheme] = useState({
    name: "",
    idCurso: "",
    nameFile: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setTheme({ ...theme, [name]: value });
  };

  const handleSubmit = async (e) => {
    theme.nameFile = file != null ? file.name : null;
    e.preventDefault();
    if (theme.name == "" || theme.idCurso == "") {
      alert("Faltan campos");
      return;
    }
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        await axios.post(`${connectionUri}api/docente/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      const { status, data } = await createTema(theme);
      if (status == 201) {
        alert(data.message);
        setTheme({
          name: "",
          idCurso: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth !== null) {
      getCoursesForId(auth.idDocente);
    }
  }, []);
  return (
    <Layout>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Tema
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Llena los campos para un nuevo registro.
            </p>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Descripción
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    value={theme.name}
                    className="w-full px-4 py-2 text-blue-900 placeholder-red-700 border border-red-500 rounded outline-none focus:ring-red-500 focus:border-red-500 focus:ring-1"
                    required
                  />
                </div>
                <p className="text-red-500 text-sm mt-1">
                  Este campo es obligatorio
                </p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="idCurso"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Curso
                </label>
                <div className="mt-2">
                  <select
                    id="idCurso"
                    name="idCurso"
                    onChange={handleChange}
                    value={theme.idCurso}
                    autoComplete="country-name"
                    className="w-full px-4 py-2 text-green-900 placeholder-green-700 border border-green-500 rounded outline-none focus:ring-green-500 focus:border-green-500 focus:ring-1"
                  >
                    <option value=""></option>
                    {course.map(({ Id, curso }, index) => (
                      <option key={index} value={Id}>
                        {curso}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Sonido
            </label>
            <div className="mt-2 flex justify-center rounded-lg  border border-dashed border-indigo-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Cargar un archivo</span>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">arrastras y soltar</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  Sound
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Imagen
            </label>
            <div className="mt-2 flex justify-center rounded-lg  border border-dashed border-indigo-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Cargar un archivo</span>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">arrastras y soltar</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  jpg, png up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Pdf
            </label>
            <div className="mt-2 flex justify-center rounded-lg  border border-dashed border-indigo-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Cargar un archivo</span>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">arrastras y soltar</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PDF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => {
              router.push("/dashboard/docente");
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Aceptar
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Create;
