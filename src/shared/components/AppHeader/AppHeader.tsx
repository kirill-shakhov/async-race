import {Link} from "react-router-dom";

const AppHeader = () => {
  return (
    <header>
      <Link
        to="/garage">
        garage
      </Link>

      <Link
        to="/winners">
        winners
      </Link>
    </header>
  )
}

export default AppHeader;