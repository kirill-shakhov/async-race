import { NavLink } from 'react-router-dom';

function AppHeader() {
  return (
    <header className="mt-4">
      <nav className="flex justify-between items-center">
        <ul className="flex justify-center gap-4 sm:justify-start">
          <li>
            <NavLink
              to="/garage"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-800 font-semibold'
                  : 'text-gray-800  font-semibold'
              }
            >
              Garage
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/winners"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-800 font-semibold'
                  : 'text-gray-800  font-semibold'
              }
            >
              Winners
            </NavLink>
          </li>
        </ul>

        <h1 className="text-xl font-bold text-gray-800">Async Race</h1>
      </nav>
    </header>
  );
}

export default AppHeader;
