import { Contact } from "@/models/types";
import { Session } from "next-auth";

const endpoint = "https://demometaway.vps-kinghost.net:8485";

export async function getSearchContactList(session: Session, term = "") {
  const res = await fetch(`${endpoint}/api/contato/pesquisar`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    body: JSON.stringify({ termo: term }),
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return res.json();
}

export async function addContact(session: Session, body: Contact) {
  const res = await fetch(`${endpoint}/api/contato/salvar/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function updateContact(session: Session, body: Contact) {
  const res = await fetch(`${endpoint}/api/contato/salvar/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function deleteContact(session: Session, id: number) {
  const res = await fetch(`${endpoint}/api/contato/remover/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });
  return res.json();
}
