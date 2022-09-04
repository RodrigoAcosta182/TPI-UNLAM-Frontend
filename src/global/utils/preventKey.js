import { regexNumero } from "./expresionesRegulares";

const preventKeyEmail = (e) => {
  if (e.code === "Space") {
    e.preventDefault();
  }
};

export default preventKeyEmail;

export const preventKeyTelefono = (e) => {
  if (!regexNumero.test(e.key)) {
    e.preventDefault();
  }
};

export const preventEletter = (e) => {
    if (
      e.key === "e" ||
      e.key === "E" ||
      e.key === "+" ||
      e.key === "." ||
      e.key === "," ||
      e.key === "-"
    ) {
      e.preventDefault();
    }
  };
  
