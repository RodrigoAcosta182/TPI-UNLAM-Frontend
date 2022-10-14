import { useContext, useEffect } from "react";
import LoginBox from "../../components/auth/LoginBox/LoginBox";
import Loading from "../../components/genericos/Loading/Loading";
import { resetListError } from "../../context/action/listError/listError";

import { GlobalContext } from "../../context/Provider";

import "./Login.css";

const Login = () => {
  const { listErrorDispatch, authState } = useContext(GlobalContext);

  useEffect(() => {
    resetListError()(listErrorDispatch);
  }, []);

  return (
    <>
      <Loading state={authState.auth.loading} mensaje={"Accediendo"} />
      <div className="login-container">
        <LoginBox></LoginBox>
      </div>
    </>
  );
};

export default Login;
