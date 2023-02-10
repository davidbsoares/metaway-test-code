import { Person } from "@/models/types";
import { Dispatch, SetStateAction, Fragment, useState, FormEvent } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { addEditPerson, searchPeople } from "@/services/people";
import Input from "@/components/FormInput";
import MaskedInput from "@/components/MaskedInput";
import Sent from "@/components/Sent";
import Error from "@/components/Error";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setPeople: Dispatch<SetStateAction<Person[] | null>>;
};

const PeopleModalAdd = ({ open, setOpen, setPeople }: Props) => {
  const session = useSession();
  const [form, setForm] = useState<Person>({
    nome: "",
    cpf: "",
    endereco: {
      logradouro: "",
      numero: "",
      cep: "",
      bairro: "",
      cidade: "",
      estado: "",
      pais: "",
    },
    foto: null,
  });

  const [passwordFormSent, setPasswordFormSent] = useState<
    "no" | "sent" | "error"
  >("no");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (session.status === "authenticated") {
      addEditPerson(session.data, form)
        .then(() => {
          setPasswordFormSent("sent");

          searchPeople(session.data).then((data) => {
            setPeople(data);
          });
        })
        .catch(() => {
          setPasswordFormSent("error");
        });
    }
  }

  function onClose() {
    setOpen(false);
  }

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
                Adicionar Pessoa
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                Aqui você consegue adicionar uma pessoa
              </DialogPrimitive.Description>
              {passwordFormSent === "sent" ? (
                <Sent label="Usuário Adicionado" />
              ) : passwordFormSent === "error" ? (
                <Error label="Houve um erro ao enviar o formulário" />
              ) : (
                <form
                  className="mt-2 grid grid-cols-2 gap-5"
                  onSubmit={handleSubmit}
                >
                  <Input
                    label="Nome"
                    type="text"
                    value={form.nome}
                    onChange={(e) =>
                      setForm((oldState) => ({
                        ...oldState,
                        nome: e.target.value,
                      }))
                    }
                  />
                  <MaskedInput
                    label="CPF"
                    mask="cpf"
                    value={form?.cpf}
                    onChange={(e) =>
                      setForm((oldState) => ({
                        ...oldState,
                        cpf: e.target.value,
                      }))
                    }
                  />
                  <Input
                    label="País"
                    type="text"
                    value={form.endereco.pais}
                    onChange={(e) =>
                      setForm((oldState) => ({
                        ...oldState,
                        endereco: {
                          ...oldState.endereco,
                          pais: e.target.value,
                        },
                      }))
                    }
                  />
                  <MaskedInput
                    label="CEP"
                    mask="cep"
                    value={form?.endereco.cep}
                    onChange={(e) =>
                      setForm((oldState) => ({
                        ...oldState,
                        endereco: {
                          ...oldState.endereco,
                          cep: e.target.value,
                        },
                      }))
                    }
                  />

                  <Input
                    label="Cidade"
                    type="text"
                    value={form.endereco.cidade}
                    onChange={(e) =>
                      setForm((oldState) => ({
                        ...oldState,
                        endereco: {
                          ...oldState.endereco,
                          cidade: e.target.value,
                        },
                      }))
                    }
                  />
                  <Input
                    label="Logradouro"
                    type="text"
                    value={form.endereco.logradouro}
                    onChange={(e) =>
                      setForm((oldState) => ({
                        ...oldState,
                        endereco: {
                          ...oldState.endereco,
                          logradouro: e.target.value,
                        },
                      }))
                    }
                  />
                  <Input
                    label="Bairro"
                    type="text"
                    value={form.endereco.bairro}
                    onChange={(e) =>
                      setForm((oldState) => ({
                        ...oldState,
                        endereco: {
                          ...oldState.endereco,
                          bairro: e.target.value,
                        },
                      }))
                    }
                  />

                  <Input
                    label="Número"
                    type="number"
                    value={form.endereco.numero}
                    onChange={(e) =>
                      setForm((oldState) => ({
                        ...oldState,
                        endereco: {
                          ...oldState.endereco,
                          numero: e.target.value,
                        },
                      }))
                    }
                    defaultValue=""
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
export default PeopleModalAdd;
