const maxDigitosDni = 9;
const minDigitosDni = 7;
const isDniValido = (e) => {
  if (e.target.value.length >= maxDigitosDni) {
    e.target.value = e.target.value.slice(0, maxDigitosDni);
  }

  if (e.target.value.length < minDigitosDni) return false;
  if (e.target.value.length > maxDigitosDni) return false;
  return true;
};
export default isDniValido;
