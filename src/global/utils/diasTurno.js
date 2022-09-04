export function getDiaStrTurno(fecha, mesAnio, cardFiltro) {
  let fechaSliced = fecha.slice(0, -9);
  let año = fechaSliced.slice(0, -6);
  let mes = fechaSliced.slice(5, -3) - 1;
  let dia = fechaSliced.slice(8);
  let fechaOk = new Date(año, mes, dia);

  const meses = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
  ];
  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  if (mesAnio) {
    if(cardFiltro){
      return `${", " +meses[fechaOk.getMonth()]}`;
    }else{

      return `${"de " + meses[fechaOk.getMonth()] + ", " + año}`;
    }
  } else if(cardFiltro) {
    return `${diasSemana[fechaOk.getDay()] + " " + fechaOk.getDate()}`;
  }else{
    return `${diasSemana[fechaOk.getDay()] + " " + fechaOk.getDate() + " "}`;

  }
}
