import { useContext, useEffect } from "react";
import LoginBox from "../../components/auth/LoginBox/LoginBox";
import Loading from "../../components/genericos/Loading/Loading";
import ModalAvatar from "../../components/genericos/ModalAvatar/ModalAvatar";
import { resetListError } from "../../context/action/listError/listError";
import { GlobalContext } from "../../context/Provider";

import "./Login.css";

const Login = () => {
  const {
    listErrorDispatch,
    authState,
    modalAvatarState,
  } = useContext(GlobalContext);

  useEffect(() => {
    resetListError()(listErrorDispatch);
  }, []);

  return (
    <>
      <Loading state={authState.auth.loading} mensaje={"Accediendo"} />
      {modalAvatarState.modalAvatar.show && <ModalAvatar />}
      <div className="login-container">
        <LoginBox></LoginBox>
      </div>
    </>
  );
};

export default Login;
