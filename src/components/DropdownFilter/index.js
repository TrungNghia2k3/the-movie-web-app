import React, { useEffect, useRef, useState } from "react";
import "./DropdownFilter.css";

const DropdownFilter = ({
  category,
  options,
  filters,
  filterConfig,
  activeDropdown,
  onToggleDropdown,
  onFilterChange,
  onSetActiveDropdown,
}) => {
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const isActive = activeDropdown === category;

  // Calculate dropdown position
  useEffect(() => {
    if (isActive && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
      });
    }
  }, [isActive]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isActive && dropdownRef.current) {
        if (
          !dropdownRef.current.contains(event.target) &&
          !buttonRef.current.contains(event.target)
        ) {
          onSetActiveDropdown(null);
        }
      }
    };

    const handleScroll = () => {
      if (isActive) {
        onSetActiveDropdown(null);
      }
    };

    const handleResize = () => {
      if (isActive) {
        onSetActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive, onSetActiveDropdown]);

  return (
    <>
      <li>
        <a
          ref={buttonRef}
          href="/"
          className="filter-dropdown dropdown-toggle"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleDropdown(category);
          }}
          aria-expanded={isActive}
        >
          <span className="text-capitalize">
            {category === "sortBy" ? "Sort by" : category}
          </span>
          <i
            className={`bi bi-chevron-down transition-transform ${
              isActive ? "rotate-180" : ""
            }`}
          ></i>
        </a>
      </li>

      {isActive && (
        <div
          ref={dropdownRef}
          className="dropdown-menu dropdown-filter"
          style={{
            position: "absolute",
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            zIndex: 99999,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((option) => (
            <div key={option} className="dropdown-item">
              <div className="form-check" onClick={(e) => e.stopPropagation()}>
                <input
                  className="form-check-input"
                  type={filterConfig.type}
                  name={filterConfig.type === "radio" ? category : undefined}
                  id={`${category}-${option}`}
                  checked={filters[category].includes(option)}
                  onChange={(e) => {
                    e.stopPropagation();
                    onFilterChange(category, option);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <label
                  className="form-check-label"
                  htmlFor={`${category}-${option}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterChange(category, option);
                  }}
                >
                  {option}
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DropdownFilter;
