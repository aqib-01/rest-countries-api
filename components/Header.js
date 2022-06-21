import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useAppContext } from "../context/AppProvider";
import { motion } from "framer-motion";
const Header = () => {
  const {
    state: { darkMode },
    dispatch,
  } = useAppContext();
  const toggleDarkMode = () => {
    if (darkMode) {
      localStorage.setItem("darkMode", false);
      dispatch({ type: "DARK_MODE", payload: false });
    } else {
      localStorage.setItem("darkMode", true);
      dispatch({ type: "DARK_MODE", payload: true });
    }
  };
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      dispatch({
        type: "DARK_MODE",
        payload: JSON.parse(localStorage.getItem("darkMode")),
      });
    }
  }, []);
  return (
    <header className="bg-white py-7 shadow-sm dark:bg-dark-blue">
      <div className="wrapper">
        <div className="flex items-center justify-between ">
          <motion.div
            initial={{
              x: -300,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            className="text-very-dark-blue-text dark:text-white text-lg font-bold"
          >
            Where in the world?
          </motion.div>
          <motion.button
            initial={{
              x: 300,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            onClick={toggleDarkMode}
          >
            <FontAwesomeIcon
              className={`dark:text-very-light-gray`}
              icon={darkMode ? faSun : faMoon}
            />
            <span className="text-dark-blue dark:text-very-light-gray font-semibold ml-2">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;
