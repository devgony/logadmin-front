import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { TITLE } from "../const";

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
  return (
    <div className="h-full">
      <Helmet>
        <title>{`Link Manager | ${TITLE}`}</title>
      </Helmet>
    </div>
  );
}
