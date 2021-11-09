import { useQuery } from "@apollo/client";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { Fragment, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router";
import { TITLE } from "../const";
import { findLinks } from "../__generated__/findLinks";

const FIND_LINKS = gql`
  query findLinks {
    findLinks {
      links {
        name
        host
        port
        database
        connectString
        username
        password
      }
    }
  }
`;

export default function LinkManager() {
  const { loading, data } = useQuery<findLinks>(FIND_LINKS);
  console.log(data);
  const history = useHistory();
  const [selected, setSelected] = useState("");
  const connect = () => {
    if (selected === "") {
      alert("Should select DB first");
      return;
    }
    history.push({
      pathname: "/dashboard",
      state: { name: selected },
    });
  };
  useEffect(() => {
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);
  return (
    <div className="h-full flex justify-center items-center">
      <Helmet>
        <title>{`Link Manager | ${TITLE}`}</title>
      </Helmet>
      <div className="bg-gray-200 h-5/6 w-full text-xs flex flex-col items-center">
        <div className="w-full grid gap-0.5 grid-cols-[20px,14%,14%,14%,14%,14%,14%,40px] bg-green-400">
          <div></div>
          <h2>name</h2>
          <h2>host</h2>
          <h2>port</h2>
          <h2>database</h2>
          <h2>username</h2>
          <h2>password</h2>
          <div></div>
          {data?.findLinks.links.map((link, i) => (
            <Fragment key={i}>
              <div className="flex justify-center items-center">
                <input
                  className="justify-self-center"
                  type="radio"
                  name="chosen-db"
                  onClick={() => setSelected(link.name)}
                />
              </div>
              <input value={link.name} readOnly={true} />
              <input value={link.host} readOnly={true} />
              <input value={`${link.port}`} readOnly={true} />
              <input value={link.database} readOnly={true} />
              <input value={link.username} readOnly={true} />
              <input value={link.password} readOnly={true} type="password" />
              <button className="btn-s">Edit</button>
            </Fragment>
          ))}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <button className="btn-s bg-orange-600">Add</button>
        </div>
        <button onClick={connect} className="btn-s bg-green-600 mx-auto">
          Connect
        </button>
      </div>
    </div>
  );
}
