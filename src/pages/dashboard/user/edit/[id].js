import Layout from "../../../../components/Layout";
import React from "react";
import { useGlobal } from "../../../../context/GlobalProvider";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const rols = [
  {
    id: 5,
    name: "Docente",
  },
  {
    id: 6,
    name: "Director",
  },
];

const Edit = () => {
  const router = useRouter();
  const [checkedItems, setCheckedItems] = useState([]);
  const {
    company,
    obtenerEscuela,
    updateUser,
    updateUserDirector,
    obtenerUsuarioId,
    obtenerUsuarioDocente,
    obtenerUsuarioDirector,
  } = useGlobal();
  const [user, setUser] = useState({
    id_usuario: "",
    username: "",
    rol: "",
    empresa: "",
    documento: "",
    Nombre: "",
    Apellido: "",
    id_docente: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    user.usuario = user.documento;

    if (
      user.documento === "" ||
      user.Nombre === "" ||
      user.Apellido === "" ||
      user.empresa === "" ||
      user.rol === ""
    ) {
      alert("Existen Campos Vacíos");
      return;
    }
    try {
      const { status, data } =
        user.rol == 5
          ? await updateUser(user.id_usuario, user)
          : await updateUserDirector(user.id_usuario, user);
      if (status == 201) {
        alert("MODIFICADO");
      } else {
        alert(`${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obtenerEscuela();
  }, [obtenerEscuela]);

  useEffect(() => {
    const loadData = async (id) => {
      const { data } = await obtenerUsuarioId(id);
      if (data[0].IdRol == 5) {
        const { data } = await obtenerUsuarioDocente(id);
        setUser(data[0]);
      }
      if (data[0].IdRol == 6) {
        const { data } = await obtenerUsuarioDirector(id);
        setUser(data[0]);
      }
    };
    if (router.query?.id) {
      loadData(router.query.id);
    }
  }, [
    obtenerUsuarioDirector,
    obtenerUsuarioDocente,
    obtenerUsuarioId,
    router.query.id,
  ]);
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Información Personal
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Ingrese sus datos necesarios para la edici&oacute;n.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="rol"
                  className="block text-sm font-bold leading-6 text-gray-900"
                >
                  Rol
                </label>
                <div className="mt-2">
                  <select
                    onChange={handleChange}
                    id="rol"
                    name="rol"
                    autoComplete="empresa-name"
                    className="w-full px-4 py-2 text-green-900 placeholder-green-700 border border-green-500 rounded outline-none focus:ring-green-500 focus:border-green-500 focus:ring-1"
                  >
                    <option>-- Seleccionar --</option>
                    {rols.map(({ id, name }) => (
                      <option key={id} value={id} selected={user.rol == id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Documento
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="documento"
                    disabled={true}
                    id="documento"
                    autoComplete="given-name"
                    className="w-full px-4 py-2 text-blue-900 placeholder-red-700 border border-red-500 rounded outline-none focus:ring-red-500 focus:border-red-500 focus:ring-1"
                    required
                    value={user.documento}
                    maxLength={8}
                  />
                  <p className="text-red-500 text-sm mt-1">
                    Este campo es obligatorio
                  </p>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombres
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="Nombre"
                    id="Nombre"
                    value={user.Nombre}
                    autoComplete="given-name"
                    className="w-full px-4 py-2 text-red-900 placeholder-red-700 border border-red-500 rounded outline-none focus:ring-red-500 focus:border-red-500 focus:ring-1"
                    required
                  />
                  <p className="text-red-500 text-sm mt-1">
                    Este campo es obligatorio
                  </p>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Apellidos
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="Apellido"
                    id="Apellido"
                    value={user.Apellido}
                    autoComplete="family-name"
                    className="w-full px-4 py-2 text-red-900 placeholder-red-700 border border-red-500 rounded outline-none focus:ring-red-500 focus:border-red-500 focus:ring-1"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    Este campo es obligatorio
                  </p>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Usuario
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="username"
                    id="username"
                    value={user.documento}
                    disabled={true}
                    autoComplete="given-name"
                    className="w-full px-4 py-2 text-green-900 placeholder-green-700 border border-green-500 rounded outline-none focus:ring-green-500 focus:border-green-500 focus:ring-1"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="empresa"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Seleccionar Colegio
                </label>
                <div className="mt-2">
                  <select
                    onChange={handleChange}
                    id="empresa"
                    name="empresa"
                    autoComplete="empresa-name"
                    className="w-full px-4 py-2 text-green-900 placeholder-green-700 border border-green-500 rounded outline-none focus:ring-green-500 focus:border-green-500 focus:ring-1"
                  >
                    <option>-- Seleccionar --</option>
                    {company.map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                        selected={user.empresa == item.id}
                      >
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => {
                  router.push("/dashboard/user");
                }}
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

export default Edit;
