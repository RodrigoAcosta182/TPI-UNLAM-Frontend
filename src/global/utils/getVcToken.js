const GetVcToken = (search) => {
  const token = new URLSearchParams(search).get("vc");
  return token;
};

export default GetVcToken;
