import { createContext, useContext, useEffect, useReducer } from "react";
import { initialState } from "../state-handling/initialState";
import { reducer } from "../state-handling/reducer";
import axios from "axios";
const context = createContext();
export const useAppContext = () => useContext(context);
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchCountries = async () => {
    const res = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region,borders"
    );
    dispatch({ type: "SET_ALL_COUNTRIES", payload: res.data });
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  const contextValues = {
    state,
    dispatch,
  };
  return <context.Provider value={contextValues}>{children}</context.Provider>;
};

export default AppProvider;
