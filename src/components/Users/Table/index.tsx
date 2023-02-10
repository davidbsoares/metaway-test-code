import useWindowSize from "@/hooks/useWindowSize";
import { User } from "@/models/types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  users: User[];
  setUser: Dispatch<SetStateAction<User | null>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const UsersTable = ({ users, setUser, setOpen }: Props) => {
  const { width } = useWindowSize();
  function handleEdit(contact: User) {
    setOpen(true);
    setUser(contact);
  }

  return (
    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            <div className="flex flex-col gap-y-1">
              <span>Nome</span>
              {width && width < 640 && (
                <>
                  <span>E-mail</span>
                  <span>Telefone</span>
                </>
              )}
            </div>
          </th>
          {width && width >= 640 && (
            <>
              <th scope="col" className="px-6 py-3">
                <span>E-mail</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span>Telefone</span>
              </th>
            </>
          )}

          <th scope="col" className="px-6 py-3">
            <span>Editar</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr
            className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            key={user.id}
          >
            <td className="px-6 py-4">
              <div className="flex flex-col gap-y-1">
                <span>{user.nome}</span>
                {width && width < 640 && (
                  <>
                    <span>{user.email}</span>
                    <span>{user.telefone}</span>
                  </>
                )}
              </div>
            </td>
            {width && width >= 640 && (
              <>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.telefone}</td>
              </>
            )}
            <td className="flex gap-1 px-6 py-4">
              <button
                type="button"
                className="inline-flex items-center rounded-lg bg-yellow-400 p-2 text-center text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
                onClick={() => handleEdit(user)}
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  ></path>
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default UsersTable;
