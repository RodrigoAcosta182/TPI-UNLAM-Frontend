export const findAndUpdate = (lista, prop, mail, newValue) => {
  const elementoEncontrado = lista.find((item) => {
    return item.mail === mail;
  });
  elementoEncontrado[prop] = newValue;
};
