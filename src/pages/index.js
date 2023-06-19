import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useGlobal } from "../context/GlobalProvider";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { setAuth, SignIn, auth } = useGlobal();
  const [user, setUser] = useState({
    us: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (user.us == "" || user.password == "") {
      setLoader(false);
      setMessage("Campos vacios");
      alert("Existen Campos Vacíos");
      return;
    }
    try {
      const { status, data } = await SignIn(user);
      if (status == 201) {
        localStorage.setItem("auth", JSON.stringify(data.user));
        setAuth(data.user);
        router.push("/dashboard");
        setLoader(false);
      } else {
        setLoader(false);
        alert(`${data.message}`);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    if (auth != null) {
      router.push("/dashboard");
    }
  }, [auth, router]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <Head>
          <title>Iniciar sesión</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-7 text-blue-600">
            Iniciar sesión
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="document"
                className="block text-sm font-medium text-gray-700"
              >
                Documento
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="document"
                className="mt-1 bg-white border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500 block w-full shadow-sm sm:text-sm rounded-md px-4 py-2"
                name="us"
                value={user.us}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                onChange={handleChange}
                type="password"
                id="password"
                className="mt-1 bg-white border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500 block w-full shadow-sm sm:text-sm rounded-md px-4 py-2"
                name="password"
                value={user.password}
              />
            </div>
            {loader ? (
              <div className="text-center">
                <div className=" ml-2 spinner"></div>
              </div>
              
            ) : (
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
              >
                Iniciar sesión
              </button>
            )}
          </form>
          <div className="mt-4 text-center">
            <Link
              href="#"
              className="text-sm text-black-600 hover:text-red-700 transition duration-200 font-bold"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
