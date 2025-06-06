import { NavLink } from "react-router";

const Header = () => {
  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <NavLink
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span className="fs-4 text-white">The Movie Web App</span>
        </NavLink>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/movie"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Movies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/show"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              TV Shows
            </NavLink>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
