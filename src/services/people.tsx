import { Person } from "@/models/types";
import { Session } from "next-auth";

const endpoint = "https://demometaway.vps-kinghost.net:8485";

export async function searchPeople(session: Session, nome = "") {
  const res = await fetch(`${endpoint}/api/pessoa/pesquisar/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    body: JSON.stringify({
      nome: "",
    }),
  });
  return res.json();
}

export async function addEditPerson(session: Session, body: Person) {
  const res = await fetch(`${endpoint}/api/pessoa/salvar/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function deletePerson(session: Session, id: number) {
  const res = await fetch(`${endpoint}/api/pessoa/remover/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });
  return res.json();
}
