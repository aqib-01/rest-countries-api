import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useAppContext } from "../context/AppProvider";
import { motion } from "framer-motion";
const SearchBar = () => {
  const { dispatch } = useAppContext();
  const searchCountries = (e) => {
    dispatch({ type: "UPDATE_SEARCH_VALUE", payload: e.target.value });
    dispatch({ type: "SEARCH_COUNTRIES", payload: e.target.value });
  };
  return (
    <motion.div
      initial={{
        x: "-300",
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      className="search-bar "
    >
      <FontAwesomeIcon icon={faSearch} className="search-icon " />
      <input
        onChange={searchCountries}
        type="search"
        placeholder="Search for a country..."
      />
    </motion.div>
  );
};

export default SearchBar;
