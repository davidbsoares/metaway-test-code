import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { route } = useRouter();
  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus={false}
      refetchInterval={30 * 60}
    >
      {route !== "/login" && <Navbar />}
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
