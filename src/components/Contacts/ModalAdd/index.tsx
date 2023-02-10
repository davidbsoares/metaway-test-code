import { Contact, Person } from "@/models/types";
import { Dispatch, SetStateAction, Fragment, useState, FormEvent } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { addContact, getSearchContactList } from "@/services/contacts";
import Input from "@/components/FormInput";
import SelectInput from "@/components/SelectInput";
import MaskedInput from "@/components/MaskedInput";
import Error from "@/components/Error";
import Sent from "@/components/Sent";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setContact: Dispatch<SetStateAction<Contact | null>>;
  setContacts: Dispatch<SetStateAction<Contact[]>>;
  people: Person[];
};

const ContactModalAdd = ({
  open,
  setOpen,
  setContact,
  setContacts,
  people,
}: Props) => {
  const session = useSession();
  const [personName, setPersonName] = useState<string>("");
  const personObject = people.filter(
    (person) => person.nome == personName
  )?.[0];

  const [passwordFormSent, setPasswordFormSent] = useState<
    "no" | "sent" | "error"
  >("no");

  const [form, setForm] = useState({
    email: "",
    telefone: "",
  });

  const items = people.map((person) => ({
    id: person.id,
    name: person.nome,
  }));

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (session.status === "authenticated") {
      addContact(session.data, { ...form, pessoa: personObject })
        .then(() => {
          setPasswordFormSent("sent");
          getSearchContactList(session.data).then((data) => {
            setContacts(data);
          });
        })
        .catch(() => {
          setPasswordFormSent("error");
        });
    }
  }

  function onClose() {
    setOpen(false);
    setContact(null);
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
                Adicionar Contato
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                Aqui você consegue adicionar um contato a uma pessoa
              </DialogPrimitive.Description>
              {passwordFormSent === "sent" ? (
                <Sent label="Contato adicionado!" />
              ) : passwordFormSent === "error" ? (
                <Error label="Houve um erro ao enviar o formulário" />
              ) : (
                <form className="mt-2" onSubmit={handleSubmit}>
                  <SelectInput items={items} setPerson={setPersonName} />
                  <Input
                    label="E-mail"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((oldState) => ({
                        ...oldState,
                        email: e.target.value,
                      }))
                    }
                  />
                  <MaskedInput
                    label="Telefone"
                    mask="tel"
                    value={form?.telefone}
                    required
                    onChange={(e) =>
                      setForm((oldState) => ({
                        ...oldState,
                        telefone: e.target.value,
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
export default ContactModalAdd;
