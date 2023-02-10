import useWindowSize from "@/hooks/useWindowSize";
import { Person } from "@/models/types";
import { deletePerson, searchPeople } from "@/services/people";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  people: Person[] | null;
  setPerson: Dispatch<SetStateAction<Person | null>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setPeople: Dispatch<SetStateAction<Person[] | null>>;
};

const PeopleTable = ({ people, setPerson, setOpen, setPeople }: Props) => {
  const session = useSession();
  const { width } = useWindowSize();

  function handleEdit(people: Person) {
    setOpen(true);
    setPerson(people);
  }

  function handleDelete(id: number) {
    if (session.status === "authenticated") {
      deletePerson(session.data, id).then(() => {
        searchPeople(session.data).then((data) => {
          setPeople(data);
        });
      });
    }
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
                  <span>CPF</span>
                  <span>Cidade</span>
                </>
              )}
            </div>
          </th>
          {width && width >= 640 && (
            <>
              <th scope="col" className="px-6 py-3">
                <span>CPF</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span>Cidade </span>
              </th>
            </>
          )}

          <th scope="col" className="px-6 py-3">
            <span>Ações</span>
          </th>
        </tr>
      </thead>

      <tbody>
        {people?.map((person) => (
          <tr
            className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            key={person.id}
          >
            <td className="px-6 py-4">
              <div className="flex flex-col gap-y-1">
                <span>{person.nome}</span>
                {width && width < 640 && (
                  <>
                    <span>{person.cpf}</span>
                    <span>{person.endereco.cidade}</span>
                  </>
                )}
              </div>
            </td>
            {width && width >= 640 && (
              <>
                <td className="px-6 py-4">{person.cpf}</td>
                <td className="px-6 py-4">{person.endereco.cidade}</td>
              </>
            )}

            <td className="flex gap-1 px-6 py-4">
              <button
                type="button"
                className="inline-flex items-center rounded-lg bg-yellow-400 p-2 text-center text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
                onClick={() => handleEdit(person)}
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
              <button
                onClick={() => person.id && handleDelete(person.id)}
                type="button"
                className="inline-flex items-center rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800  focus:outline-none focus:ring-4 focus:ring-blue-300  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
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
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
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
export default PeopleTable;
