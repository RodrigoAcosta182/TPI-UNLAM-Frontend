// funcion acorta texto
export const funAcortarText = (size, text) => {
  if (text) {
    if (text.length > size) {
      return text.slice(0, size) + "...";
    } else return text;
  }
};
