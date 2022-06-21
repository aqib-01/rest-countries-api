import Head from "next/head";

import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterRegion from "../components/FilterRegion";
import CountryCard from "../components/CountryCard";
import Spinner from "../components/Spinner";
import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "../context/AppProvider";

export default function Home() {
  const { state } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (state.countries.length) {
      setIsLoading(false);
    } else if (!state.countries.length) {
      setIsLoading(true);
    }
  }, [state.countries]);
  return (
    <>
      <Head>
        <title>Countries</title>
      </Head>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="wrapper">
          <div className="my-10 md:flex items-center justify-between">
            <SearchBar />
            <FilterRegion />
          </div>
          <div className="my-10">
            <AnimatePresence>
              <motion.div className="countries-cards-wrapper">
                {state.activeCountries.length > 0 ? (
                  <>
                    {state.activeCountries.map((country) => (
                      <CountryCard
                        key={country.name.common}
                        countryData={country}
                      />
                    ))}
                  </>
                ) : (
                  <div className="my-28 font-semibold text-center text-lg text-dark-blue dark:text-white">
                    {state.activeFilteredRegion !== "none"
                      ? `The Country you have searched for doesn't exist or it is not located in ${state.activeFilteredRegion}. Try finding it in other regions.`
                      : "No Countries match your search"}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
}
