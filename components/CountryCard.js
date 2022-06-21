import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { arrayCommas, numbersCommas } from "../utils/utils";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppProvider";
const countryCardVariants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.2,
    },
  },
};

const CountryCard = ({ countryData }) => {
  const [ref, inView] = useInView();
  const control = useAnimation();
  const router = useRouter();
  const {
    state: { darkMode },
  } = useAppContext();
  const { flags, name, population, region, capital } = countryData;
  useEffect(() => {
    if (inView) {
      control.start("animate");
    } else {
      control.start("initial");
    }
  }, [control, inView]);
  return (
    <>
      <motion.div
        onClick={() => router.push(`/${name.common.toLowerCase()}`)}
        ref={ref}
        variants={countryCardVariants}
        animate={control}
        initial={"initial"}
        whileHover={{
          y: -5,
          boxShadow: darkMode
            ? "0 0 10px rgb(255, 255, 255, .4)"
            : "0 0 10px rgb(0, 0, 0, .4)",
        }}
        tabIndex={0}
        className="bg-white dark:bg-dark-blue rounded-lg shadow-md overflow-hidden max-w-xs 
         cursor-pointer"
      >
        <div className="flex">
          <img
            className="flex-1 h-36 w-auto object-cover"
            src={flags.png}
            alt={`Flag of ${name.common}`}
          />
        </div>
        <div className="pt-5 pb-12 px-8">
          <h3
            className="text-xl mb-6 font-extrabold 
             text-very-dark-blue-text dark:text-white"
          >
            {name.common}
          </h3>
          <div>
            <strong className="text-dark-blue dark:text-very-light-gray">
              Population:{" "}
            </strong>
            <span className="ml-2 text-dark-gray">
              {numbersCommas(population)}
            </span>
          </div>
          <div className="mt-2">
            <strong className="text-dark-blue dark:text-very-light-gray">
              Region:{" "}
            </strong>
            <span className="ml-2 text-dark-gray">{region}</span>
          </div>
          <div className="mt-2">
            <strong className="text-dark-blue dark:text-very-light-gray">
              Capital:{" "}
            </strong>
            <span className="ml-2 text-dark-gray">
              {arrayCommas(capital) || "None"}
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CountryCard;
