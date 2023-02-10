export type Contact = {
  email: string;
  id?: number;
  pessoa?: Person;
  privado?: true;
  tag?: string;
  telefone: string;
  tipoContato?: string;
  usuario?: User;
};

export type Person = {
  cpf: string;
  endereco: {
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    id?: number;
    logradouro: string;
    numero: string;
    pais: string;
  };
  foto: {
    id: string;
    name: string;
    type: string;
  } | null;
  id?: number;
  nome: string;
};

export type User = {
  cpf: string;
  dataNascimento: string;
  email: string;
  id?: number;
  nome: string;
  password?: string;
  telefone: string;
  username?: string;
};
