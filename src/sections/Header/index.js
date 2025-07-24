import { useState } from "react";
import { Link, useNavigate } from "react-router";
import countries from "../../assets/data/countries";
import genres from "../../assets/data/genres";
import logo from "../../assets/images/logo.png";
import user from "../../assets/images/user.png";
import "./Header.css";

const Header = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchIconClick = () => {
    setSearchActive(true);

    if (searchKeyword.trim() === "") return;
    setSearchKeyword(searchKeyword.trim());

    navigate("/movie-listing?keyword=" + searchKeyword);
  };

  const handleCloseIconClick = () => {
    setSearchActive(false);
    setSearchKeyword("");
  };

  const selectedCountries = countries.filter((country) =>
    [
      "US",
      "GB",
      "CA",
      "KR",
      "HK",
      "JP",
      "FR",
      "TH",
      "CN",
      "AU",
      "TW",
      "DE",
    ].includes(country.iso_3166_1)
  );

  return (
    <header>
      <nav className="navbar navbar-expand-xl p-0">
        <div className="container-fluid header-container">
          {/* Mobile Layout */}
          <div className="d-xl-none d-flex justify-content-between align-items-center w-100">
            {/* Logo */}
            <a className="navbar-brand p-0" href="/">
              <img src={logo} alt="Logo" height="30" />
            </a>
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className="bi bi-list fs-2"></i>
            </button>
          </div>

          {/* Desktop Layout */}
          <div className="d-none d-xl-flex w-100 justify-content-between align-items-center">
            {/* Left - Main Menu with Dropdowns */}
            <ul className="navbar-nav d-flex flex-row gap-4">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/movie-listing">
                  Listing
                </a>
              </li>

              {/* Genre Dropdown */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Genre
                </button>
                <ul className="dropdown-menu bg-dark">
                  <div className="dropdown-grid">
                    <div className="col">
                      {genres.slice(0, 10).map((genre) => (
                        <li key={genre.id}>
                          <Link
                            className="dropdown-item"
                            to={`/movie-listing?genreId=${genre.id}`}
                            onClick={() => setSearchActive(false)}
                          >
                            {genre.name}
                          </Link>
                        </li>
                      ))}
                    </div>
                    <div className="col">
                      {genres.slice(10).map((genre) => (
                        <li key={genre.id}>
                          <Link
                            className="dropdown-item"
                            to={`/movie-listing?genreId=${genre.id}`}
                            onClick={() => setSearchActive(false)}
                          >
                            {genre.name}
                          </Link>
                        </li>
                      ))}
                    </div>
                  </div>
                </ul>
              </li>

              {/* Country Dropdown */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Country
                </button>
                <ul className="dropdown-menu bg-dark">
                  <div className="dropdown-grid">
                    <div className="col">
                      {selectedCountries.slice(0, 5).map((country) => (
                        <li key={country.iso_3166_1}>
                          <Link
                            className="dropdown-item"
                            to={`/movie-listing?countryCode=${country.iso_3166_1}`}
                            onClick={() => setSearchActive(false)}
                          >
                            {country.english_name}
                          </Link>
                        </li>
                      ))}
                    </div>
                    <div className="col">
                      {selectedCountries.slice(5, 10).map((country) => (
                        <li key={country.iso_3166_1}>
                          <Link
                            className="dropdown-item"
                            to={`/movie-listing?countryCode=${country.iso_3166_1}`}
                            onClick={() => setSearchActive(false)}
                          >
                            {country.english_name}
                          </Link>
                        </li>
                      ))}
                    </div>
                  </div>
                </ul>
              </li>
            </ul>

            {/* Center - Logo */}
            <a className="navbar-brand d-xl-block p-0" href="/">
              <img src={logo} alt="Logo" height="30" />
            </a>

            {/* Right - Icons */}
            <ul className="navbar-nav d-flex flex-row gap-3 align-items-center">
              <li className="nav-item">
                {/* Search Wrapper */}
                <div
                  className={`search-container ${searchActive ? "active" : ""}`}
                >
                  <div className="search-content">
                    <i
                      className="bi bi-search fs-4 search-icon"
                      onClick={handleSearchIconClick}
                    ></i>
                    <div className="search-input-wrapper">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                      />
                      <i
                        className="bi bi-x close-icon"
                        onClick={handleCloseIconClick}
                      ></i>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item position-relative">
                <button className="nav-link">
                  <i className="bi bi-bell fs-4"></i>
                  <span className="position-absolute badge rounded-pill bg-success">
                    1
                  </span>
                </button>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={user}
                    alt="User"
                    className="rounded-circle"
                    width="32"
                    height="32"
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-header">
          <img src={logo} alt="Logo" height="30" />
          <button 
            className="close-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i className="bi bi-x fs-2"></i>
          </button>
        </div>
        
        <div className="mobile-sidebar-content">
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <Link 
                to="/" 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                HOME
              </Link>
            </li>

            <li className="mobile-nav-item">
              <Link
                to="/movie-listing"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                LISTING
              </Link>
            </li>
            
            {/* Genre Dropdown in Mobile */}
            <li className="mobile-nav-item">
              <button 
                className="mobile-nav-link dropdown-toggle-mobile"
                onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
              >
                GENRE
                <i className={`bi bi-chevron-${genreDropdownOpen ? 'up' : 'down'}`}></i>
              </button>
              <ul className={`mobile-dropdown ${genreDropdownOpen ? 'open' : ''}`}>
                {genres.map((genre) => (
                  <li key={genre.id}>
                    <Link
                      className="mobile-dropdown-item"
                      to={`/movie-listing?genreId=${genre.id}`}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setGenreDropdownOpen(false);
                      }}
                    >
                      {genre.name.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            
            {/* Country Dropdown in Mobile */}
            <li className="mobile-nav-item">
              <button 
                className="mobile-nav-link dropdown-toggle-mobile"
                onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
              >
                COUNTRY
                <i className={`bi bi-chevron-${countryDropdownOpen ? 'up' : 'down'}`}></i>
              </button>
              <ul className={`mobile-dropdown ${countryDropdownOpen ? 'open' : ''}`}>
                {selectedCountries.map((country) => (
                  <li key={country.iso_3166_1}>
                    <Link
                      className="mobile-dropdown-item"
                      to={`/movie-listing?countryCode=${country.iso_3166_1}`}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setCountryDropdownOpen(false);
                      }}
                    >
                      {country.english_name.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="mobile-sidebar-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
