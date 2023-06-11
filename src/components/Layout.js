/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useGlobal } from "../context/GlobalProvider";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import NProgress from "nprogress";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Home", href: "/dashboard", current: true, roles: [1, 5, 6] },
  { name: "Usuarios", href: "/dashboard/user", current: false, roles: [1, 6] },
  {
    name: "Docente",
    href: "/dashboard/docente",
    current: false,
    roles: [1, 5, 6],
  },
  { name: "Colegios", href: "/dashboard/empresa", current: false, roles: [1] },
  { name: "Alumnos", href: "/dashboard/piscologo", current: false, roles: [1, 8] },
];
const userNavigation = [
  { name: "Perfil", href: "#", onClick: null },
  { name: "Cerrar Sesión", href: "#", onClick: "handleclickPress" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Layout = ({ children }) => {
  const router = useRouter();
  const { auth, LogOut, setAuth } = useGlobal();

  const [isClient, setIsClient] = useState(false);

  const handleclickPress = () => {
    LogOut();
    if (localStorage.getItem("item") == null) {
      setAuth(null);
      window.location.href = "/";
    }
  };

  //Redirecciona a la pagina de iniciar sesion si  auth es null
  useEffect(() => {
    setIsClient(true);
  }, []);

  useMemo(() => {
    if (isClient && auth === null) {
      router.push("/");
    }
  }, [auth, isClient]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      NProgress.start();
    };
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", () => NProgress.done());

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-8 w-8"
                        width={250}
                        height={250}
                        src="/cg.jpg"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map(({ name, href, current, roles }) => {
                          if (auth != null) {
                            if (roles.includes(auth.IdRol)) {
                              return (
                                <Link
                                  key={name}
                                  href={href}
                                  className={classNames(
                                    current
                                      ? "bg-gray-900 text-white"
                                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "rounded-md px-3 py-2 text-sm font-medium"
                                  )}
                                  aria-current={current ? "page" : undefined}
                                >
                                  {name}
                                </Link>
                              );
                            }
                          }
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <Image
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              width={200}
                              height={200}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              <Link
                                href="#"
                                className="bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                              >
                                Perfil
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <button
                                onClick={handleclickPress}
                                className="bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                              >
                                Cerrar Sesión
                              </button>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map(({ name, href, current, roles }) => {
                    if (auth != null) {
                      if (roles.includes(auth.IdRol)) {
                        return (
                          <Disclosure.Button
                            key={name}
                            as="a"
                            href={href}
                            className={classNames(
                              current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "block rounded-md px-3 py-2 text-base font-medium"
                            )}
                            aria-current={current ? "page" : undefined}
                          >
                            {name}
                          </Disclosure.Button>
                        );
                      }
                    }
                  })}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        width={200}
                        height={200}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        onClick={item.onClick != null ? handleclickPress : ""}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-indigo-600 ">
              BIENVENIDO A TEAYUDO APRENDER
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
