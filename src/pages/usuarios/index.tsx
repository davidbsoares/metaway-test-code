import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Contact, Person, User } from "@/models/types";
import { getSearchContactList } from "@/services/contacts";
import { searchPeople } from "@/services/people";
import Search from "@/components/Search";
import UsersTable from "@/components/Users/Table";
import UsersModalEdit from "@/components/Users/ModalEdit";
import UsersModalAdd from "@/components/Users/ModalAdd";
import { getSearchUserList } from "@/services/users";

const Users: NextPage = () => {
  const session = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    if (session.status === "authenticated") {
      getSearchUserList(session.data).then((data) => setUsers(data));
    }
  }, [session]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (session.status === "authenticated") {
        getSearchUserList(session.data, search).then((data) => {
          setUsers(data);
        });
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  if (!users?.length) return null;
  return (
    <>
      <Head>
        <title>Metaway | Usuários</title>
        <meta name="description" content="Metaway Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start ">
        <div className="relative overflow-x-auto">
          <Search
            buttonText="Adicionar usuário"
            label="Pesquisar usuários"
            search={search}
            setOpen={setOpenAdd}
            setSearch={setSearch}
          />
          <UsersTable users={users} setOpen={setOpenEdit} setUser={setUser} />
        </div>
        {user && (
          <UsersModalEdit
            open={openEdit}
            user={user}
            setOpen={setOpenEdit}
            setUser={setUser}
            setUsers={setUsers}
          />
        )}

        <UsersModalAdd
          open={openAdd}
          setOpen={setOpenAdd}
          setUser={setUser}
          setUsers={setUsers}
        />
      </main>
    </>
  );
};

export default Users;
