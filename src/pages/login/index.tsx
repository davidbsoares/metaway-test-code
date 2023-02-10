import { type NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/FormInput";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ErrorsProps = {
  username?: string;
  password?: string;
};

type FormProps = {
  username: string;
  password: string;
};
const Login: NextPage = () => {
  const router = useRouter();
  const session = useSession();

  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<ErrorsProps>({});

  const loginSchema = yup.object().shape({
    username: yup.string().required("Campo obrigatório"),
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(8, "A senha deve ter no mínimo 8 caracteres"),
  });

  const [form, setForm] = useState<FormProps>({
    username: "",
    password: "",
  });

  const handleRemember = () => {
    setRemember((oldState) => !oldState);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginSchema.validate(form, { abortEarly: false }).then(() => {
        signIn("credentials", {
          username: form.username,
          password: form.password,
          redirect: false,
        }).then(({ ok, error }) => {
          if (ok) {
            router.push("/");
          } else {
            console.log(error);
            toast.error("Login ou senha inválidos", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        });
      });
    } catch (err) {
      setErrors(
        err.inner.reduce((acc, { path, message }) => {
          acc[path] = message;
          return acc;
        }, {})
      );
    }
  };

  if (session.status === "authenticated") {
    router.push("/");
  }
  if (session.status === "unauthenticated") {
    return (
      <>
        <Head>
          <title>Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-400">
          <div className="flex flex-col items-center justify-center rounded-md bg-white p-5">
            <h1 className="text-xl font-bold">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input
                label="Usuário"
                type="text"
                value={form.username}
                required
                error={errors.username}
                onChange={(e) =>
                  setForm((oldState) => ({
                    ...oldState,
                    username: e.target.value,
                  }))
                }
              />
              <Input
                label="Senha Atual"
                type="password"
                value={form.password}
                required
                error={errors.password}
                onChange={(e) =>
                  setForm((oldState) => ({
                    ...oldState,
                    password: e.target.value,
                  }))
                }
              />

              <div className="mb-6 flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    name="remember"
                    checked={remember}
                    onChange={handleRemember}
                    className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Lembre-se de mim
                </label>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-gray-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 sm:w-auto"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </>
    );
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center"></div>
  );
};

export default Login;
