export const reducer = (state, action) => {
  if (action.type === "DARK_MODE") {
    return {
      ...state,
      darkMode: action.payload,
    };
  }
  if (action.type === "SET_ALL_COUNTRIES") {
    if (state.activeFilteredRegion.toLowerCase() === "none") {
      return {
        ...state,
        countries: [...action.payload],
        activeCountries: [...action.payload],
      };
    } else {
      const filteredCountries = state.countries.filter((country) => {
        return country.region
          .toLowerCase()
          .includes(state.activeFilteredRegion.toLowerCase());
      });
      return {
        ...state,
        countries: [...action.payload],
        activeCountries: [...filteredCountries],
      };
    }
  }
  if (action.type === "UPDATE_SEARCH_VALUE") {
    return {
      ...state,
      searchCountryValue: action.payload.toLowerCase(),
    };
  }
  if (action.type === "SEARCH_COUNTRIES") {
    if (state.activeFilteredRegion.toLowerCase() === "none") {
      const filteredCountries = state.countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(state.searchCountryValue);
      });

      return {
        ...state,
        activeCountries: [...filteredCountries],
      };
    } else {
      const filteredCountriesInitial = state.countries.filter((country) => {
        return country.region
          .toLowerCase()
          .includes(state.activeFilteredRegion.toLowerCase());
      });
      const filteredCountries = filteredCountriesInitial.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(state.searchCountryValue);
      });
      return {
        ...state,
        activeCountries: [...filteredCountries],
      };
    }
  }
  if (action.type === "FILTER_BY_REGION") {
    if (
      action.payload.toLowerCase() === "none" &&
      state.searchCountryValue.trim().length === 0
    ) {
      return {
        ...state,
        activeFilteredRegion: "none",
        activeCountries: [...state.countries],
      };
    } else if (
      action.payload.toLowerCase() === "none" &&
      state.searchCountryValue.trim().length
    ) {
      const filteredCountries = state.countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(state.searchCountryValue);
      });
      return {
        ...state,
        activeFilteredRegion: "none",
        activeCountries: [...filteredCountries],
      };
    } else {
      const filteredCountries = state.countries.filter((country) => {
        return (
          country.region.toLowerCase().includes(action.payload.toLowerCase()) &&
          country.name.common.toLowerCase().includes(state.searchCountryValue)
        );
      });
      return {
        ...state,
        activeFilteredRegion: action.payload,
        activeCountries: [...filteredCountries],
      };
    }
  }
};
