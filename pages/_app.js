import Header from "../components/Header";
import "../styles/css/globals.css";
import "../styles/css/styles.css";
import AppProvider from "../context/AppProvider";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppProvider>
        <Header />
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} />{" "}
        </AnimatePresence>
      </AppProvider>
    </>
  );
}

export default MyApp;
