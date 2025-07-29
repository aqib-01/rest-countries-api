import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { clickOutside } from "../hooks/useClickOutside";
import { useAppContext } from "../context/AppProvider";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
const FilterRegion = () => {
  const {
    dispatch,
    state: { activeFilteredRegion },
  } = useAppContext();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [regions, setRegions] = useState([
    "None",
    "Africa",
    "America",
    "Asia",
    "Europe",
    "Oceania",
  ]);
  const filterRegionBtnRef = useRef();
  const filterRegionModalRef = useRef();
  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };
  const filterRegion = (region) => {
    dispatch({ type: "FILTER_BY_REGION", payload: region });
    setIsFilterModalOpen(false);
  };

  useEffect(() => {
    clickOutside(
      (e) => {
        setIsFilterModalOpen(false);
      },
      filterRegionModalRef,
      filterRegionBtnRef
    );
  }, []);
  return (
    <motion.div
      initial={{
        x: "300",
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      className="mt-10 mx-auto md:m-0 relative w-fit"
    >
      <button
        ref={filterRegionBtnRef}
        onClick={toggleFilterModal}
        className="bg-white dark:bg-dark-blue  shadow-md px-10 py-5 rounded-md
       flex items-center hover:opacity-60 focus:opacity-60"
      >
        <span className="text-dark-blue dark:text-white font-semibold mr-4">
          {activeFilteredRegion !== "none" ? <>Region: <span className="text-dark-gray">{activeFilteredRegion}</span></> : "Filter by region"}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="text-dark-blue dark:text-white"
        />
      </button>
      {/* {activeFilteredRegion !== "none" && (
        <motion.div
          animate={{ scale: 1, opacity: 1 }}
          initial={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            
            delay: 0.5,
          }}
          className="absolute top-full mt-2"
        >
          <span className="text-sm -z-10 text-dark-blue dark:text-very-light-gray font-semibold">
            Active Region:
          </span>
          <span className="ml-3 text-dark-gray">{activeFilteredRegion}</span>
        </motion.div>
      )} */}

      <AnimatePresence>
        {isFilterModalOpen && (
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            exit={{
              scale: 0,
            }}
            ref={filterRegionModalRef}
            className="bg-white dark:bg-dark-blue shadow-md absolute flex items-start
       flex-col gap-2 px-8 py-4 left-0 right-0 top-full mt-2 rounded-md z-20"
          >
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => filterRegion(region)}
                className={` text-dark-blue dark:text-very-light-gray
              hover:!text-yellow-400 ${
                activeFilteredRegion.toLowerCase() === region.toLowerCase()
                  ? "!text-yellow-400"
                  : ""
              }`}
              >
                {region}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterRegion;
