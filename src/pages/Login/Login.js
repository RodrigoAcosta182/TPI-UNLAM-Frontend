
import LoginBox from "../../components/auth/LoginBox/LoginBox";


import "./Login.css";

const Login = () => {

  // useEffect(()=>{
  //   resetListError()(listErrorDispatch)
  // },[])

  
  return (
    <div className="login-container">
      <LoginBox></LoginBox>
    </div>
  );
};

export default Login;
