import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  faCheckCircle,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { Fragment, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { FormError } from "../components/form-error";
import { TITLE } from "../const";
import { createLink, createLinkVariables } from "../__generated__/createLink";
import { deleteLink, deleteLinkVariables } from "../__generated__/deleteLink";
import { findLinks } from "../__generated__/findLinks";
import { CreateLinkInput } from "../__generated__/globalTypes";
import { testLink } from "../__generated__/testLink";

const FIND_LINKS = gql`
  query findLinks {
    findLinks {
      links {
        name
        host
        port
        serviceName
        username
        password
      }
    }
  }
`;

const CREATE_LINK = gql`
  mutation createLink($input: CreateLinkInput!) {
    createLink(input: $input) {
      ok
      error
    }
  }
`;

const TEST_LINK = gql`
  query testLink($input: TestLinkInput!) {
    testLink(input: $input) {
      ok
      error
    }
  }
`;

const DELETE_LINK = gql`
  mutation deleteLink($input: DeleteLinkInput!) {
    deleteLink(input: $input) {
      ok
      error
    }
  }
`;

export default function LinkManager() {
  const onCompletedDeleteLink = (data: deleteLink) => {
    const { ok, error } = data.deleteLink;
    if (!ok) {
      alert(error);
      return;
    }
    refetch();
  };
  const [deleteLink, { data: dataDeleteLink }] = useMutation<
    deleteLink,
    deleteLinkVariables
  >(DELETE_LINK, {
    onCompleted: onCompletedDeleteLink,
  });
  const runDeleteLink = (name: string) => {
    const ok = window.confirm(`Delete ${name}?`);
    if (ok) {
      deleteLink({ variables: { input: { name } } });
    }
  };
  const [needTest, setNeedTest] = useState(true);
  const onCompletedTestLink = (data: testLink) => {
    console.log("onCompletedTestLink");
    const { ok, error } = data.testLink;
    if (!ok) {
      alert("Connection error");
      return;
    }
    setNeedTest(false);
    alert("Connection works!");
  };
  const [testLink, { data: dataTestLink }] = useLazyQuery(TEST_LINK, {
    onCompleted: onCompletedTestLink,
  });

  const runTest = () => {
    // if (formState.isValid) {
    const { port, ...others } = getValues();
    testLink({ variables: { input: { port: +port, ...others } } });
    // }
    // console.log("runtest");
    // handleSubmit(()=>{
    //   console.log("remote submit");
    // });
  };
  const { register, getValues, errors, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const formStateRef = useRef(formState);
  const [adding, setAdding] = useState(false);
  const { loading, data, refetch } = useQuery<findLinks>(FIND_LINKS, {
    fetchPolicy: "no-cache",
  });
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
  const onCompleted = (data: createLink) => {
    const { ok, error } = data.createLink;
    if (!ok) {
      alert(error);
      return;
    }
    refetch();
    setAdding(false);
  };
  const [createLink, { data: dataCreateLink, error }] = useMutation<
    createLink,
    createLinkVariables
  >(CREATE_LINK, {
    onCompleted,
  });
  const onSubmit: SubmitHandler<CreateLinkInput> = ({ port, ...others }) => {
    console.log(others);
    createLink({ variables: { input: { port: +port, ...others } } });
  };
  return (
    <div className="h-full flex justify-center items-center">
      <Helmet>
        <title>{`Link Manager | ${TITLE}`}</title>
      </Helmet>
      <div className="bg-gray-200 h-5/6 w-full text-xs flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          // onSubmit={event => {
          //   event.preventDefault();
          // }}
          className="w-full grid gap-0.5 grid-cols-[20px,13%,15%,13%,13%,13%,13%,50px,50px] justify-center items-center content-"
        >
          <div></div>
          <h2 className="text-center">NAME</h2>
          <h2 className="text-center">HOST</h2>
          <h2 className="text-center">PORT</h2>
          <h2 className="text-center">SERVICE NAME</h2>
          <h2 className="text-center">USERNAME</h2>
          <h2 className="text-center">PASSWORD</h2>
          <div />
          <div />
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
              <input value={link.serviceName} readOnly={true} />
              <input value={link.username} readOnly={true} />
              <input value={link.password} readOnly={true} type="password" />
              <button
                onClick={() => runDeleteLink(link.name)}
                className="btn-s bg-red-500"
                type="button"
              >
                Delete
              </button>
              <div />
            </Fragment>
          ))}
          {adding ? (
            <>
              <div />
              <input name="name" required ref={register({ required: true })} />
              <input name="host" required ref={register({ required: true })} />
              <input name="port" required ref={register({ required: true })} />
              <input
                name="serviceName"
                required
                ref={register({ required: true })}
              />
              <input
                name="username"
                required
                ref={register({ required: true })}
              />
              <input
                name="password"
                required
                ref={register({ required: true })}
                type="password"
              />
              <button
                type="button"
                onClick={runTest}
                className="btn-s bg-yellow-400"
              >
                Test
              </button>
              <button
                type="submit"
                className={`btn-s  ${needTest ? "bg-gray-400" : ""}`}
                disabled={needTest}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <button
                onClick={() => setAdding(true)}
                className="btn-s bg-green-600"
              >
                Add
              </button>
            </>
          )}
        </form>
        {errors.name?.message && (
          <FormError errorMessage={errors.name?.message} />
        )}
        <button onClick={connect} className="btn-s bg-green-600 mx-auto w-16">
          Connect
        </button>
      </div>
    </div>
  );
}
