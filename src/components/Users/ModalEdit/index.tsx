import { User } from "@/models/types";
import { Dispatch, SetStateAction, Fragment, useState, FormEvent } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import {
  getSearchUserList,
  addEditUser,
  UserFormProps,
} from "@/services/users";
import SelectInput from "@/components/SelectInput";
import Input from "@/components/FormInput";
import MaskedInput from "@/components/MaskedInput";
import Error from "@/components/Error";
import Sent from "@/components/Sent";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: User;
  setUser: Dispatch<SetStateAction<User | null>>;
  setUsers: Dispatch<SetStateAction<User[]>>;
};

const UsersModalEdit = ({ open, setOpen, user, setUser, setUsers }: Props) => {
  const session = useSession();

  const [form, setForm] = useState<UserFormProps>({
    usuario: {
      nome: user.nome || "",
      email: user.email || "",
      telefone: user.telefone || "",
      cpf: user.cpf || "",
      dataNascimento: user.dataNascimento || "",
      id: user.id,
    },
    tipos: [],
  });
  const [passwordFormSent, setPasswordFormSent] = useState<
    "no" | "sent" | "error"
  >("no");

  const items = ["ROLE_ADMIN", "ROLE_USER"].map((role) => ({
    name: role,
  }));

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (session.status === "authenticated" && user) {
      addEditUser(session.data, form)
        .then(() => {
          setPasswordFormSent("sent");

          getSearchUserList(session.data).then((data) => {
            setUsers(data);
          });
        })
        .catch(() => {
          setPasswordFormSent("error");
        });
    }
  }

  function onClose() {
    setOpen(false);
    setUser(null);
  }

  function handleRole(data: string) {
    setForm((oldState) => ({
      ...oldState,
      tipos: [...oldState.tipos, data],
    }));
  }

  if (!user) return null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onClose}>
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={open}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPrimitive.Content
              forceMount
              className="fixed top-[50%] left-[50%] z-50 w-[95vw] max-w-md -translate-x-[50%] -translate-y-[50%] rounded-lg bg-white p-4 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 dark:bg-gray-800 md:w-full"
            >
              <DialogPrimitive.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Editar Usuário
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                Aqui você consegue editar um usuário
              </DialogPrimitive.Description>
              {passwordFormSent === "sent" ? (
                <Sent label="Informações alteradas!" />
              ) : passwordFormSent === "error" ? (
                <Error label="Houve um erro ao enviar o formulário" />
              ) : (
                <form className="mt-2" onSubmit={handleSubmit}>
                  <SelectInput
                    placeholder="Selecione um papel para o usuário"
                    items={items}
                    setValue={handleRole}
                  />
                  <Input
                    label="Nome"
                    type="text"
                    value={form.usuario.nome}
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
                  <Input
                    label="E-mail"
                    type="email"
                    value={form.usuario.email}
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
                  <Input
                    label="Telefone"
                    type="tel"
                    value={form.usuario.telefone}
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
                  <div className="mt-4 flex justify-end">
                    <button className="inline-flex select-none justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75 dark:bg-green-700 dark:text-gray-100 dark:hover:bg-green-600">
                      Salvar
                    </button>
                  </div>
                </form>
              )}
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
export default UsersModalEdit;
