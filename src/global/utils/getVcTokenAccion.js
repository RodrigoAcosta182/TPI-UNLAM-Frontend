const GetVcTokenAccion = (search) => {
  const accion = new URLSearchParams(search).get("accion");
  return accion;
};

export default GetVcTokenAccion;
