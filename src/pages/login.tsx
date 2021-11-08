import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { LOGADMIN_TOKEN, TITLE } from "../const";
import { SubmitHandler, useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { login, loginVariables } from "../__generated__/login";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LoginInput } from "../__generated__/globalTypes";

const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`;

interface ILoginForm {
  username: string;
  password: string;
}

export default function Login() {
  // const history = useHistory();
  const { register, getValues, errors, handleSubmit, formState } =
    useForm<ILoginForm>({ mode: "onChange" });
  const onCompleted = (data: login) => {
    const { ok, error, token } = data.login;
    if (ok && token) {
      localStorage.setItem(LOGADMIN_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
      // history.push("/");
    }
  };
  const [login, { data: loginMutationResult, loading }] = useMutation<
    login,
    loginVariables
  >(LOGIN, {
    onCompleted,
  });
  const onSubmit: SubmitHandler<LoginInput> = data => {
    login({ variables: { input: { ...data } } });
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>{`Login | ${TITLE}`}</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        {/* <img src={nuberLogo} className="w-52 mb-10" alt="Nuber Eats" /> */}
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            ref={register({
              required: "username is required",
            })}
            name="username"
            required
            type="username"
            placeholder="Username"
            className="input"
          />
          {errors.username?.message && (
            <FormError errorMessage={errors.username?.message} />
          )}
          {errors.username?.type === "pattern" && (
            <FormError errorMessage={"Please enter a valid username"} />
          )}
          <input
            ref={register({ required: "Password is required" })}
            required
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 4 chars." />
          )}
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText="Log In"
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          <Link
            to="/create-account"
            className="text-orange-600 hover:underline"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
