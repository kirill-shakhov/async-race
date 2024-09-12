import {Link} from "react-router-dom";

const AppHeader = () => {
  return (
    <header className='mt-4'>
      <nav className='flex justify-between'>
        <ul className="flex justify-center gap-4 sm:justify-start">
          <li>
            <Link
              to="/garage">
              garage
            </Link>
          </li>

          <li>
            <Link
              to="/winners">
              winners
            </Link>
          </li>
        </ul>

        <h1>
          Async Race
        </h1>
      </nav>
    </header>
  )
}

export default AppHeader;