import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Input from "@/components/FormInput";
import SelectInput from "@/components/SelectInput";
import { useEffect, useState, FormEvent } from "react";
import {
  PasswordEditProps,
  UserFormProps,
  changePassword,
  editMe,
  getMe,
} from "@/services/users";
import Sent from "@/components/Sent";
import Error from "@/components/Error";
import MaskedInput from "@/components/MaskedInput";
import * as yup from "yup";

type PasswordErrorProps = {
  passwordValidation?: string;
  password?: string;
  newPassword?: string;
};

const Profile: NextPage = () => {
  const session = useSession();
  const [formSent, setFormSent] = useState<"no" | "sent" | "error">("no");
  const [passwordFormSent, setPasswordFormSent] = useState<
    "no" | "sent" | "error"
  >("no");
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrorProps>({});
  const [form, setForm] = useState<UserFormProps>({
    usuario: {
      nome: "",
      email: "",
      telefone: "",
      cpf: "",
      dataNascimento: "",
    },
    tipos: [],
  });

  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .required("Campo obrigatório")
      .length(8, "A senha deve ter no mínimo 8 caracteres"),
    passwordValidation: yup
      .string()
      .required("Campo obrigatório")
      .length(8, "A senha deve ter no mínimo 8 caracteres")
      .oneOf([yup.ref("password")], "Suas senhas não são iguais."),
    newPassword: yup
      .string()
      .required("Campo obrigatório")
      .length(8, "A senha deve ter no mínimo 8 caracteres"),
  });

  const [passwordForm, setPasswordForm] = useState<
    PasswordEditProps & { passwordValidation: string }
  >({
    username: "",
    passwordValidation: "",
    password: "",
    newPassword: "",
  });

  const items = ["ROLE_ADMIN", "ROLE_USER"].map((role) => ({
    name: role,
  }));

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (session.status === "authenticated") {
      editMe(session.data, form)
        .then(() => {
          setFormSent("sent");
        })
        .catch(() => {
          setFormSent("error");
        });
    }
  }

  console.log(passwordForm);

  async function handleSubmitPaswword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await passwordSchema
        .validate(
          {
            username: passwordForm.username,
            password: passwordForm.password,
            passwordValidation: passwordForm.passwordValidation,
            newPassword: passwordForm.newPassword,
          },
          { abortEarly: false }
        )
        .then(() => {
          if (session.status === "authenticated") {
            changePassword(session.data, passwordForm)
              .then(() => {
                setPasswordFormSent("sent");
              })
              .catch(() => {
                setPasswordFormSent("error");
              });
          }
        });
    } catch (err) {
      setPasswordErrors(
        err.inner.reduce((acc, { path, message }) => {
          acc[path] = message;
          return acc;
        }, {})
      );
    }
  }

  console.log(passwordErrors);

  useEffect(() => {
    if (session.status === "authenticated") {
      getMe(session.data).then(({ object }) => {
        setForm({
          usuario: {
            nome: object.usuario.nome || "",
            email: object.usuario.email || "",
            telefone: object.usuario.telefone || "",
            cpf: object.usuario.cpf || "",
            dataNascimento: object.usuario.dataNascimento || "",
            id: object.usuario.id,
          },
          tipos: [...object.tipos],
        });
        setPasswordForm((oldState) => ({
          ...oldState,
          username: object.usuario.username,
        }));
      });
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Metaway | Meu Cadastro</title>
        <meta name="description" content="Metaway Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-wrap items-center justify-center gap-24  p-10">
        <div className="basis-80 rounded border-2 border-solid border-gray-600 bg-white p-6">
          {formSent === "sent" ? (
            <Sent label="Dados editados!" />
          ) : formSent === "error" ? (
            <Error label="Houve um erro ao enviar o formulário" />
          ) : (
            <form
              className="mt-2 flex flex-col flex-wrap"
              onSubmit={handleSubmit}
            >
              <h1 className="mb-4 text-center text-xl">Edite seus Dados</h1>
              {form?.tipos?.length && (
                <SelectInput items={items} defaultValue={form?.tipos[0]} />
              )}

              <Input
                label="Nome"
                type="text"
                value={form.usuario.nome}
                required
                onChange={(e) =>
                  setForm((oldState) => ({
                    ...oldState,
                    usuario: {
                      ...oldState.usuario,
                      nome: e.target.value,
                    },
                  }))
                }
              />

              <Input
                label="E-mail"
                type="email"
                value={form.usuario.email}
                required
                onChange={(e) =>
                  setForm((oldState) => ({
                    ...oldState,
                    usuario: {
                      ...oldState.usuario,
                      email: e.target.value,
                    },
                  }))
                }
              />
              <MaskedInput
                label="CPF"
                mask="cpf"
                value={form?.usuario?.cpf}
                onChange={(e) =>
                  setForm((oldState) => ({
                    ...oldState,
                    usuario: {
                      ...oldState.usuario,
                      cpf: e.target.value,
                    },
                  }))
                }
              />
              <MaskedInput
                label="Telefone"
                mask="tel"
                value={form?.usuario?.telefone}
                onChange={(e) =>
                  setForm((oldState) => ({
                    ...oldState,
                    usuario: {
                      ...oldState.usuario,
                      telefone: e.target.value,
                    },
                  }))
                }
              />
              <MaskedInput
                label="Data de Nascimento"
                mask="date"
                value={form?.usuario?.dataNascimento}
                onChange={(e) =>
                  setForm((oldState) => ({
                    ...oldState,
                    usuario: {
                      ...oldState.usuario,
                      dataNascimento: e.target.value,
                    },
                  }))
                }
              />

              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex w-full select-none justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75 dark:bg-green-700 dark:text-gray-100 dark:hover:bg-green-600"
                >
                  Salvar
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="basis-80 rounded border-2 border-solid border-gray-600 bg-white p-6">
          {passwordFormSent === "sent" ? (
            <Sent label="Senha trocada!" />
          ) : passwordFormSent === "error" ? (
            <Error label="Houve um erro ao enviar o formulário" />
          ) : (
            <form
              className="mt-2 flex flex-col flex-wrap"
              onSubmit={handleSubmitPaswword}
            >
              <h1 className="mb-4 text-center text-xl">Troque sua senha</h1>
              <Input
                label="Senha Atual"
                type="password"
                value={passwordForm.password}
                required
                error={passwordErrors.password}
                onChange={(e) =>
                  setPasswordForm((oldState) => ({
                    ...oldState,
                    password: e.target.value,
                  }))
                }
              />

              <Input
                label="Confirme sua senha"
                type="password"
                value={passwordForm.passwordValidation}
                required
                error={passwordErrors.passwordValidation}
                onChange={(e) =>
                  setPasswordForm((oldState) => ({
                    ...oldState,
                    passwordValidation: e.target.value,
                  }))
                }
              />

              <Input
                label="Senha"
                type="password"
                value={passwordForm.newPassword}
                error={passwordErrors.newPassword}
                required
                onChange={(e) =>
                  setPasswordForm((oldState) => ({
                    ...oldState,
                    newPassword: e.target.value,
                  }))
                }
              />

              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex w-full select-none justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75 dark:bg-green-700 dark:text-gray-100 dark:hover:bg-green-600"
                >
                  Salvar
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </>
  );
};

export default Profile;
