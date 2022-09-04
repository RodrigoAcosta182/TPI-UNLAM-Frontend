const FechaTurnoInvertida = () => {
  let fechaDefault = new Date();

  return (
    (fechaDefault.getDate() < 10
      ? "0" + fechaDefault.getDate()
      : fechaDefault.getDate()) +
    "-" +
    (fechaDefault.getMonth() + 1 < 10
      ? "0" + (fechaDefault.getMonth() + 1)
      : fechaDefault.getMonth() + 1) +
    "-" +
    fechaDefault.getFullYear()
  );
};
export default FechaTurnoInvertida;
