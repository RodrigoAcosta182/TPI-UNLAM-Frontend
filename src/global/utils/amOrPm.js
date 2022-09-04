export function amOrPm(hora) {
  let horaSliced = hora.slice(0, -4);

  if (horaSliced > 0) {
    return `${"PM"}`;
  } else {
    return `${"AM"}`;
  }
}
