import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Contacts: NextPage = () => {
  return (
    <>
      <Head>
        <title>Metaway Project</title>
        <meta name="description" content="Metaway Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <button
          onClick={() =>
            signIn("credentials", {
              username: "admin",
              password: "12345678",
            })
          }
        >
          Test
        </button>
      </main>
    </>
  );
};

export default Contacts;
