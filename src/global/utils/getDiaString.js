export function getDiaString(fecha) {
  let fechaSliced = fecha.slice(0, -9);
  let año = fechaSliced.slice(0, -6);
  let mes = fechaSliced.slice(5, -3) - 1;
  let dia = fechaSliced.slice(8);
  let fechaOk = new Date(año, mes, dia);

  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  return `${diasSemana[fechaOk.getDay()]}`;
}
