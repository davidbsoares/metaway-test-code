import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export const navLinks = [
  { name: "Home", path: "/" },
  {
    name: "Pessoas",
    path: "/pessoas",
  },
  {
    name: "Usuários",
    path: "/usuarios",
  },
  {
    name: "Meu Cadastro",
    path: "/meu-cadastro",
  },
];

const Navbar = () => {
  const { data } = useSession();

  const userAdmin = data?.user?.roles?.includes("ROLE_ADMIN");

  return (
    <NavigationMenu.Root className="relative z-10 mt-2  mb-5 flex w-full justify-center gap-2 border-b py-2">
      <NavigationMenu.List className="m-0 flex w-full list-none items-center justify-end rounded-md bg-white p-1">
        {navLinks.map(({ name, path }) => {
          if (path === "/usuarios" && !userAdmin) return null;
          return (
            <NavigationMenu.Item key={name} className="hover:bg-gray-100">
              <Link href={path}>
                <NavigationMenu.Trigger className="select-none rounded py-2 px-3 text-sm font-medium leading-none text-black outline-none">
                  {name}
                </NavigationMenu.Trigger>
              </Link>
            </NavigationMenu.Item>
          );
        })}

        <NavigationMenu.Item className="hover:bg-gray-100 sm:ml-12">
          <NavigationMenu.Trigger
            type="submit"
            className="w-full rounded-lg bg-gray-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 sm:w-auto"
            onClick={() => signOut()}
          >
            Sair
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <div className="absolute left-0 top-full flex w-full justify-center">
        <NavigationMenu.Viewport className="relative mt-2 hidden w-full origin-center rounded-md bg-white shadow-sm transition-all ease-linear" />
      </div>
    </NavigationMenu.Root>
  );
};

export default Navbar;
