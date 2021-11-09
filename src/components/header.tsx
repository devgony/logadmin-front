import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <>
      <header className="h-5vh bg-gray-400 flex justify-between px-2 items-center">
        <Link to="/">
          <h1 className="flex items-center bg-orange-300">Link Manager</h1>
        </Link>
        <Link to="/">
          <h1 className="flex items-center bg-orange-300">Logadmin</h1>
        </Link>
        <span className="text-xs">
          <Link to="/edit-profile">
            <FontAwesomeIcon icon={faBars} className="text-3xl" />
          </Link>
        </span>
      </header>
    </>
  );
};
