import { regexEmail } from "./expresionesRegulares";

const isErrorEmail = (email) => {
  if (!regexEmail.test(email)) {
    return true;
  }
  if (email === "") {
    return true;
  }
  return false;
};

export default isErrorEmail;
