import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Person } from "@/models/types";
import PeopleTable from "@/components/People/Table";
import PeopleModalEdit from "@/components/People/ModalEdit";
import { searchPeople } from "@/services/people";
import PeopleModalAdd from "@/components/People/ModalAdd";
import Search from "@/components/Search";

const Home: NextPage = () => {
  const session = useSession();
  const [people, setPeople] = useState<Person[] | null>(null);
  const [person, setPerson] = useState<Person | null>(null);
  const [search, setSearch] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (session.status === "authenticated") {
        searchPeople(session.data, search).then((data) => {
          setPeople(data);
        });
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search, session]);

  if (!people?.length) return null;
  return (
    <>
      <Head>
        <title>Metaway | Pessoas</title>
        <meta name="description" content="Metaway Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start ">
        <div className="relative overflow-x-auto">
          <Search
            buttonText="Adicionar pessoa"
            label="Pesquisar pessoas"
            search={search}
            setOpen={setOpenAdd}
            setSearch={setSearch}
          />

          <PeopleTable
            people={people}
            setOpen={setOpenEdit}
            setPerson={setPerson}
            setPeople={setPeople}
          />
          {person && (
            <PeopleModalEdit
              open={openEdit}
              setOpen={setOpenEdit}
              person={person}
              setPerson={setPerson}
              setPeople={setPeople}
            />
          )}
          <PeopleModalAdd
            open={openAdd}
            setOpen={setOpenAdd}
            setPeople={setPeople}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
