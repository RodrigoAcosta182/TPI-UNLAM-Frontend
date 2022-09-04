const maxDigitosPwd = 10;
const minDigitosDni = 4;
const isPwdValido = (e) => {
  if (e.target.value.length >= maxDigitosPwd) {
    e.target.value = e.target.value.slice(0, maxDigitosPwd);
  }

  if (e.target.value.length < minDigitosDni) return false;
  if (e.target.value.length > maxDigitosPwd) return false;
  return true;
};
export default isPwdValido;