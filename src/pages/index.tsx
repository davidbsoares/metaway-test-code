import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Contact, Person } from "@/models/types";
import ContactsTable from "../components/Contacts/Table/index";
import { getSearchContactList } from "@/services/contacts";
import { searchPeople } from "@/services/people";
import ContactModalAdd from "@/components/Contacts/ModalAdd";
import ContactModalEdit from "@/components/Contacts/ModalEdit";
import Search from "@/components/Search";
import { ToastContainer } from "react-toastify";

const Home: NextPage = () => {
  const session = useSession();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [people, setPeople] = useState<Person[]>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [search, setSearch] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    if (session.status === "authenticated") {
      getSearchContactList(session.data).then((data) => setContacts(data));
      searchPeople(session.data).then((data) => {
        setPeople(data);
      });
    }
  }, [session]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (session.status === "authenticated") {
        getSearchContactList(session.data, search).then((data) => {
          setContacts(data);
        });
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  if (!contacts?.length) return null;
  return (
    <>
      <Head>
        <title>Metaway | Home</title>
        <meta name="description" content="Metaway Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start">
        <div className="relative overflow-x-auto">
          <Search
            buttonText="Adicionar contato"
            label="Pesquisar contatos"
            search={search}
            setOpen={setOpenAdd}
            setSearch={setSearch}
          />
          <ContactsTable
            contacts={contacts}
            setOpen={setOpenEdit}
            setContact={setContact}
            setContacts={setContacts}
          />
        </div>
        {contact && people && (
          <ContactModalEdit
            open={openEdit}
            setOpen={setOpenEdit}
            contact={contact}
            setContact={setContact}
            setContacts={setContacts}
            people={people}
          />
        )}
        {people && (
          <ContactModalAdd
            open={openAdd}
            setOpen={setOpenAdd}
            setContact={setContact}
            setContacts={setContacts}
            people={people}
          />
        )}
      </main>
    </>
  );
};

export default Home;
