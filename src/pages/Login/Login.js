
import { useContext, useEffect } from "react";
import LoginBox from "../../components/auth/LoginBox/LoginBox";
import { resetListError } from "../../context/action/listError/listError";
import { GlobalContext } from "../../context/Provider";


import "./Login.css";

const Login = () => {
  const { listErrorDispatch } = useContext(GlobalContext);

  useEffect(()=>{
    resetListError()(listErrorDispatch)
  },[])

  return (
    <div className="login-container">
      <LoginBox></LoginBox>
    </div>
  );
};

export default Login;
