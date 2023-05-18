/* eslint-disable @next/next/no-img-element */
import Layout from "../../components/Layout";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useGlobal } from "../../context/GlobalProvider";

const people = [
  {
    name: "Usuarios",
    role: "Sección / Usuarios",
    imageUrl: "https://www.dropbox.com/s/p72480ssmktze6a/director.png?dl=1",
    link: "/dashboard/user",
    roles: [1, 6],
  },
  {
    name: "Docentes",
    role: "Sección / Docentes",
    imageUrl: "https://www.dropbox.com/s/mzj1qapmjvt83ck/prof.png?dl=1",
    link: "/dashboard/docente",
    roles: [1, 6, 5],
  },
  {
    name: "Colegios",
    role: "Sección / Colegios",
    imageUrl: "https://www.dropbox.com/s/9c8pgw4zftry8mk/colegio.png?dl=1",
    link: "/dashboard/empresa",
    roles: [1, 6],
  },
];

const Home = () => {
  const router = useRouter();
  const { auth } = useGlobal();
  return (
    <Layout>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              TEAyudo Aprender
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              TEAyudo Aprender es una herramienta de aprendizaje, intervención e
              inclución social para persona con TEA y otras niños con
              habilidades especiales. Es una aplicación interactiva para
              favorecer la inclusión educativa y social.
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {people.map(({ name, link, role, imageUrl, roles }) => {
              if (auth != null) {
                if (roles.includes(auth.IdRol)) {
                  return (
                    <li key={name}>
                      <button
                        onClick={() => {
                          router.push(link);
                        }}
                      >
                        <div className="flex items-center gap-x-6">
                          <img
                            className="h-20 w-20 rounded-full"
                            src={imageUrl}
                            alt=""
                          />
                          <div>
                            <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                              {name}
                            </h3>
                            <p className="text-sm font-semibold leading-6 text-indigo-600">
                              {role}
                            </p>
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                }
              }
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
