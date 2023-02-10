import { Contact, User } from "@/models/types";
import { Session } from "next-auth";

const endpoint = "https://demometaway.vps-kinghost.net:8485";

export type UserBodyProps = {
  tipos: string[] | [];
  usuario: User;
};

export type UserFormProps = {
  tipos: string[] | [];
  usuario: User;
};

export type PasswordEditProps = {
  newPassword: string;
  password: string;
  username: string;
};

export async function getSearchUserList(session: Session, term = "") {
  const res = await fetch(`${endpoint}/api/usuario/pesquisar`, {
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

export async function addEditUser(session: Session, body: UserBodyProps) {
  const res = await fetch(`${endpoint}/api/usuario/salvar/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function getMe(session: Session) {
  const res = await fetch(`${endpoint}/api/usuario/buscar/${session.user.id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });
  return res.json();
}

export async function editMe(session: Session, body: UserFormProps) {
  const res = await fetch(
    `${endpoint}/api/usuario/atualizar/${session.user.id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify(body),
    }
  );
  return res.json();
}

export async function changePassword(
  session: Session,
  body: PasswordEditProps
) {
  const res = await fetch(`${endpoint}/api/usuario/alterarSenha/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}
