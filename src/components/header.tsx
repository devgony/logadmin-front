import {
  faBars,
  faPlug,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOGADMIN_TOKEN } from "../const";

export const Header: React.FC = () => {
  const logcation = useLocation<{ name: string }>();
  const history = useHistory();
  const logout = () => {
    localStorage.setItem(LOGADMIN_TOKEN, "");
    authTokenVar("");
    isLoggedInVar(false);
    history.push("/");
  };
  return (
    <>
      <header className="h-5vh bg-gray-800 flex justify-between px-2 items-center text-white">
        <Link to="/">
          <h1 className="flex items-center ">LOGADMIN</h1>
        </Link>
        <h2>{logcation?.state?.name || ""}</h2>
        <span className="">
          <Link to="/">
            <FontAwesomeIcon icon={faPlug} className="text-3xl" />
          </Link>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="ml-4 text-3xl hover:cursor-pointer"
            onClick={logout}
          />
        </span>
      </header>
    </>
  );
};
