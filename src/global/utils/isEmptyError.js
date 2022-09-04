import { regexEmail, regexNombre } from "./expresionesRegulares";

export const isEmptyError = (empty) => {
  if (empty === "") {
    return true;
  }
  return false;
};
export default isEmptyError;

export const isErrorEmail = (email) => {
  if (!regexEmail.test(email)) {
    return true;
  }
  if (email === "") {
    return true;
  }
  return false;
};

export const isLocalidadError = (localidad) => {
  if (localidad !== undefined) {
    if (localidad === "") {
      return true;
    } else return false;
  } else {
    return true;
  }
};

export const isNombreApellidoError = (nombre) => {
  if (regexNombre.test(nombre)) {
    return false;
  }
  if (nombre === "") {
    return true;
  }
};
