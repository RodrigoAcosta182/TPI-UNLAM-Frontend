export const getFecha = (fechaCompleta) => {
  const fecha = fechaCompleta.replace("T00:00:00", "");
  return fecha;
};
