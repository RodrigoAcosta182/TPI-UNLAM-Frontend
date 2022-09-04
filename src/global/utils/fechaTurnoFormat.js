const fechaTurnoFormat = () => {
  let fechaDefault = new Date();

  return (
    fechaDefault.getFullYear() +
    "-" +
    (fechaDefault.getMonth() + 1 < 10
      ? "0" + (fechaDefault.getMonth() + 1)
      : fechaDefault.getMonth() + 1) +
    "-" +
    (fechaDefault.getDate() < 10
      ? "0" + fechaDefault.getDate()
      : fechaDefault.getDate())
  );
};
export default fechaTurnoFormat;
