import React, { useMemo, useState } from "react";
import countries from "../../assets/data/countries";
import genres from "../../assets/data/genres";
import languages from "../../assets/data/languages";
import sorts from "../../assets/data/sorts";
import types from "../../assets/data/types";
import DropdownFilter from "../../components/DropdownFilter";
import {
  convertFiltersForAPIOptimized,
  createLookupMaps,
} from "../../utils/filterConverter";

import "./FilterSidebar.css";

const FilterSidebar = ({ onFilterChange }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState("All");

  // UI state - keep original format for UI readability
  const [filters, setFilters] = useState({
    genre: [], // select more than 1 (display: string[], API: int32[])
    country: [], // select only 1 (display: string[], API: string[])
    year: [], // select only 1 (display: string[], API: int32[])
    type: [], // select more than 1 (display: string[], API: int32[])
    language: [], // select only 1 (display: string[], API: string[])
    rating: [], // select only 1 (display: string[], API: float[])
    sortBy: [], // select only 1 (display: string[], API: string[])
  });

  // Create lookup maps for better performance (create once)
  const lookupMaps = useMemo(
    () => createLookupMaps({ genres, countries, types, languages, sorts }),
    []
  );

  const filterOptions = {
    genre: genres.map((genre) => genre.name),
    country: countries.map((country) => country.english_name),
    year: Array.from({ length: 9 }, (_, i) =>
      (new Date().getFullYear() - i).toString()
    ),
    type: types.map((type) => type.name),
    language: languages.map((language) => language.english_name),
    rating: ["5.0", "6.0", "7.0", "8.0"],
    sortBy: sorts.map((sort) => sort.name),
  };

  // Configure input type for each category
  const filterConfig = {
    genre: { multiple: true, type: "checkbox" }, // select more than 1
    country: { multiple: false, type: "radio" }, // select only 1
    year: { multiple: false, type: "radio" }, // select only 1
    type: { multiple: true, type: "checkbox" }, // select more than 1
    language: { multiple: false, type: "radio" }, // select only 1
    rating: { multiple: false, type: "radio" }, // select only 1
    sortBy: { multiple: false, type: "radio" }, // select only 1
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleFilterChange = (category, value) => {
    const newFilters = { ...filters };
    const config = filterConfig[category];

    if (config.multiple) {
      // Checkbox logic - can select multiple
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(
          (item) => item !== value
        );
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
    } else {
      // Radio logic - can select only 1
      if (newFilters[category].includes(value)) {
        // If already selected, deselect (allow unselect)
        newFilters[category] = [];
      } else {
        // Select new value (replace old value)
        newFilters[category] = [value];
      }
    }

    setFilters(newFilters);

    // ❌ REMOVED: Do not call onFilterChange here
    // Convert and send API-ready filters
    // if (onFilterChange) {
    //   const apiFilters = convertFiltersForAPIOptimized(
    //     { ...newFilters, letter: selectedLetter },
    //     lookupMaps
    //   );
    //   onFilterChange(apiFilters);
    // }
  };

  const handleLetterFilter = (letter) => {
    setSelectedLetter(letter);

    // ❌ REMOVED: Do not call onFilterChange here
    // if (onFilterChange) {
    //   const apiFilters = convertFiltersForAPIOptimized(
    //     { ...filters, letter },
    //     lookupMaps
    //   );
    //   onFilterChange(apiFilters);
    // }
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      genre: [],
      country: [],
      year: [],
      type: [],
      language: [],
      rating: [],
      sortBy: [],
    };
    setFilters(clearedFilters);
    setSelectedLetter("All");

    if (onFilterChange) {
      // Send empty object when clear all
      onFilterChange({});
    }
  };

  const getActiveFiltersCount = () => {
    return (
      Object.values(filters).reduce((acc, curr) => acc + curr.length, 0) +
      (selectedLetter !== "All" ? 1 : 0)
    );
  };

  const handleApplyFilter = () => {
    if (onFilterChange) {
      const apiFilters = convertFiltersForAPIOptimized(
        { ...filters, letter: selectedLetter },
        lookupMaps
      );
      onFilterChange(apiFilters);
    }
    setActiveDropdown(null);
  };

  return (
    <div className="filter filter-sidebar mb-4">
      {/* Header */}
      <div className="d-flex justify-content-between mb-4">
        <h1 className="color-white mb-0 fs-1">Filter</h1>
        {getActiveFiltersCount() > 0 && (
          <button
            onClick={clearAllFilters}
            className="btn btn-transparent btn-clear-all fs-6"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Alphabetic Filter */}
      <ul className="alphabetic-filter mb-4">
        <li>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLetterFilter("All");
            }}
            className={selectedLetter === "All" ? "active" : ""}
          >
            All
          </a>
        </li>
        {alphabet.split("").map((letter) => (
          <li key={letter}>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleLetterFilter(letter);
              }}
              className={selectedLetter === letter ? "active" : ""}
            >
              {letter}
            </a>
          </li>
        ))}
      </ul>

      {/* Filter Dropdowns */}
      <ul className="filter-block unstyled mb-4">
        {Object.entries(filterOptions).map(([category, options]) => (
          <DropdownFilter
            key={category}
            category={category}
            options={options}
            filters={filters}
            filterConfig={filterConfig[category]}
            activeDropdown={activeDropdown}
            onToggleDropdown={toggleDropdown}
            onFilterChange={handleFilterChange}
            onSetActiveDropdown={setActiveDropdown}
          />
        ))}
      </ul>

      {/* Apply Filter Button */}
      <button className="cus-btn" onClick={handleApplyFilter}>
        <i className="bi bi-funnel"></i>
        Filter
      </button>
    </div>
  );
};

export default FilterSidebar;
