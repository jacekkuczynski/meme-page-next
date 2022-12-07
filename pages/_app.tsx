import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Component {...pageProps} />
    </UserProvider>
  );
}
