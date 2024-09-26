import { Link } from 'react-router-dom';

function AppHeader() {
  return (
    <header className="mt-4">
      <nav className="flex justify-between items-center">
        <ul className="flex justify-center gap-4 sm:justify-start">
          <li>
            <Link
              to="/garage"
              className="text-gray-800 hover:text-blue-700 font-semibold"
            >
              Garage
            </Link>
          </li>
          <li>
            <Link
              to="/winners"
              className="text-gray-800 hover:text-blue-700 font-semibold"
            >
              Winners
            </Link>
          </li>
        </ul>

        <h1 className="text-xl font-bold text-gray-800">Async Race</h1>
      </nav>
    </header>
  );
}

export default AppHeader;
