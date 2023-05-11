import Layout from "../../../components/Layout";
import React from "react";
import { useGlobal } from "../../../context/GlobalProvider";
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

const Add = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const { company, obtenerEscuela, createUser } = useGlobal();
  const [user, setUser] = useState({
    id: "",
    documento: "",
    Nombre: "",
    Apellido: "",
    usuario: "",
    contraseña: "",
    empresa: "",
    curso: [],
    rol: "",
  });

  const handleCheckChange = (id, isChecked) => {
    if (isChecked) {
      setCheckedItems([...checkedItems, { id }]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item.id !== id));
    }
  };

  const checkboxes = [
    { id: 1, name: "HABILIDADES VISUALES" },
    { id: 2, name: "HABILIDADES AUDITIVAS" },
    { id: 3, name: "HABILIDADES PSICOMOTRIZ" },
    { id: 4, name: "HABILIDADES DE ATENCION" },
    { id: 5, name: "HABILIDADES DE LENGUAJE Y COMUNICACION" },
    { id: 6, name: "HABILIDADES SOCIALES" },
    { id: 7, name: "HABILIDADES LOGICO-MATEMATICO" },
  ];
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
      user.empresa === ""
    ) {
      console.log(user);
      alert("Existen Campos Vacíos");
      return;
    }
    try {
      if (user.rol == 5) {
        user.curso = checkedItems;
      }
      const { status, data } = await createUser(user);
      if (status == 201) {
        alert("Registrado");
        setUser({
          id: "",
          documento: "",
          Nombre: "",
          Apellido: "",
          usuario: "",
          contraseña: "",
          empresa: "",
          rol: "",
        });
      } else {
        alert(`${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obtenerEscuela();
  }, []);

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Información Personal
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Ingrese sus datos necesarios para el registro.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="rol"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Rol
                </label>
                <div className="mt-2">
                  <select
                    onChange={handleChange}
                    id="rol"
                    name="rol"
                    autoComplete="empresa-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Seleccionar</option>
                    {rols.map(({ id, name }) => (
                      <option key={id} value={id}>
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
                    id="documento"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
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
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
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
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
                    name="usuario"
                    id="usuario"
                    disabled={true}
                    value={user.documento}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    type="password"
                    name="contraseña"
                    id="email"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Seleccionar</option>
                    {company.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {user.rol == 5 && (
                <div className="sm:col-span-3">
                  <div className="flex flex-wrap">
                    {checkboxes.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2 w-1/3"
                      >
                        <input
                          id={`checkbox-${item.id}`}
                          type="checkbox"
                          onChange={(e) =>
                            handleCheckChange(item.id, e.target.checked)
                          }
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <label
                          htmlFor={`checkbox-${item.id}`}
                          className="text-gray-700"
                        >
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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