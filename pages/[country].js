import axios from "axios";
import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "../context/AppProvider";
import { arrayCommas, numbersCommas } from "../utils/utils";

const Country = () => {
  const [singleCountry, setSingleCountry] = useState();
  const { state } = useAppContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const fetchSingleCountry = async (name) => {
    const res = await axios.get(
      `https://restcountries.com/v3.1/name/${name}?fullText=true`
    );
    setSingleCountry(res.data);
  };
  useEffect(() => {
    if (router.isReady) {
      fetchSingleCountry(router.query.country);
    }
  }, [router.isReady, router.query.country]);

  useEffect(() => {
    if (state.countries.length && singleCountry) {
      setLoading(false);
    } else if (!state.countries.length && !singleCountry) {
      setLoading(true);
    }
  }, [state.countries, singleCountry]);
  return (
    <>
      <Head>
        <title>{router.query.country}</title>
      </Head>
      {loading ? (
        <Spinner />
      ) : (
        <div className="wrapper">
          <motion.button
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: -100, opacity: 0 }}
            onClick={() => router.push("/")}
            className="my-10 bg-white px-6 py-2 rounded-md  text-dark-blue
          back-btn-shadow hover:opacity-60 dark:bg-dark-blue dark:text-white"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="ml-3">Back</span>
          </motion.button>
          <div className="lg:flex items-center max-w-xl mx-auto lg:max-w-none mb-10">
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: -500, opacity: 0 }}
              transition={{ delay: 0.5, type: "tween", ease: "easeOut" }}
              className="max-w-lg lg:max-w-none lg:mr-14 flex-1"
            >
              <img
                className="w-full max-w-full object-cover"
                src={singleCountry[0].flags.png}
                alt={`Flag of ${singleCountry[0].name.common}`}
              />
            </motion.div>
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: 500, opacity: 0 }}
              transition={{ delay: 0.5, type: "tween", ease: "easeOut" }}
              className="my-14 lg:my-0 flex-1"
            >
              <h3
                className="text-xl lg:text-2xl mb-6 font-extrabold 
             text-very-dark-blue-text dark:text-white"
              >
                {singleCountry[0].name.common}
              </h3>
              <div className="lg:flex items-start gap-6 xl:gap-14">
                <div>
                  <div>
                    <strong className="text-dark-blue dark:text-very-light-gray">
                      Native Name:{" "}
                    </strong>
                    <span className="ml-2 text-dark-gray">
                      {singleCountry[0].name.nativeName
                        ? singleCountry[0].name.nativeName[
                            Object.keys(singleCountry[0].languages)[
                              Object.keys(singleCountry[0].languages).length - 1
                            ]
                          ].common
                        : "None"}
                    </span>
                  </div>
                  <div className="mt-2">
                    <strong className="text-dark-blue dark:text-very-light-gray">
                      Population:{" "}
                    </strong>
                    <span className="ml-2 text-dark-gray">
                      {numbersCommas(singleCountry[0].population)}
                    </span>
                  </div>
                  <div className="mt-2">
                    <strong className="text-dark-blue dark:text-very-light-gray">
                      Region:{" "}
                    </strong>
                    <span className="ml-2 text-dark-gray">
                      {singleCountry[0].region || "None"}
                    </span>
                  </div>
                  <div className="mt-2">
                    <strong className="text-dark-blue dark:text-very-light-gray">
                      Sub Region:{" "}
                    </strong>
                    <span className="ml-2 text-dark-gray">
                      {singleCountry[0].subregion || "None"}
                    </span>
                  </div>
                  <div className="mt-2">
                    <strong className="text-dark-blue dark:text-very-light-gray">
                      Capital:{" "}
                    </strong>
                    <span className="ml-2 text-dark-gray">
                      {arrayCommas(singleCountry[0].capital) || "None"}
                    </span>
                  </div>
                </div>
                <div className="mt-10 lg:m-0">
                  <div>
                    <strong className="text-dark-blue dark:text-very-light-gray">
                      Top Level Domain:{" "}
                    </strong>
                    <span className="ml-2 text-dark-gray">
                      {singleCountry[0].tld ? singleCountry[0].tld[0] : "None"}
                    </span>
                  </div>
                  <div className="mt-2">
                    <strong className="text-dark-blue dark:text-very-light-gray">
                      Currencies:{" "}
                    </strong>
                    <span className="ml-2 text-dark-gray">
                      {singleCountry[0].currencies
                        ? arrayCommas(
                            Object.values(singleCountry[0].currencies).map(
                              (t) => t.name
                            )
                          )
                        : "None"}
                    </span>
                  </div>
                  <div className="mt-2">
                    <strong className="text-dark-blue dark:text-very-light-gray">
                      Languages:{" "}
                    </strong>
                    <span className="ml-2 text-dark-gray">
                      {singleCountry[0].languages
                        ? arrayCommas(Object.values(singleCountry[0].languages))
                        : "None"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <h4
                  className="text-lg mb-4 font-semibold
             text-very-dark-blue-text dark:text-white"
                >
                  Border Countries
                </h4>
                <div className="flex items-center gap-3 flex-wrap">
                  {state.countries.filter((c) => {
                    return c.borders.includes(singleCountry[0].cca3);
                  }).length > 0 ? (
                    state.countries
                      .filter((c) => {
                        return c.borders.includes(singleCountry[0].cca3);
                      })
                      .map((country) => {
                        return (
                          <button
                            onClick={() => {
                              router.push(country.name.common.toLowerCase());
                              setLoading(true);
                              fetchSingleCountry(
                                country.name.common.toLowerCase()
                              );
                            }}
                            key={country.name.common}
                            className=" bg-white px-6 py-2 rounded-md text-dark-blue
                    back-btn-shadow hover:opacity-60 dark:bg-dark-blue dark:text-white"
                          >
                            {country.name.common}
                          </button>
                        );
                      })
                  ) : (
                    <div className="text-dark-blue dark:text-dark-gray">
                      None
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default Country;
