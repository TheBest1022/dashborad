import Layout from "../../../components/Layout";
import React from "react";
import { useGlobal } from "../../../context/GlobalProvider";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Add = () => {
  const { createCompany } = useGlobal();
  const [company, setCompany] = useState({
    nombre: "",
    distrito: "",
    provincia: "",
    departamento: "",
  });

  const clear = () => {
    setCompany({
      nombre: "",
      distrito: "",
      provincia: "",
      departamento: "",
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setCompany({ ...company, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      company.nombre == "" ||
      company.distrito == "" ||
      company.departamento == "" ||
      company.provincia == ""
    ) {
      alert("Campos Vacios");
      return;
    }

    try {
      const { status, data } = await createCompany(company);
      if (status == 201) {
        clear();
        alert("Registrado");
      } else {
        alert(`${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Información de Colegios
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Ingrese sus datos necesarios para el registro.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombre
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    value={company.nombre}
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="distrito"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Distrito
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="distrito"
                    id="distrito"
                    value={company.distrito}
                    onChange={handleChange}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="provincia"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Provincia
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="provincia"
                    id="provincia"
                    onChange={handleChange}
                    value={company.provincia}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="departamento"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Departamento
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="departamento"
                    id="departamento"
                    value={company.departamento}
                    onChange={handleChange}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Add;
