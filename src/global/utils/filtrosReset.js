const filtrosReset = {
  centros: [{ id: 0, descripcion: "Todos los centros", checked: true }],
  fecha: "",
  dias: [
    { id: 0, descripcion: "Todos", checked: true },
    {
      id: 1,
      descripcion: "Lunes",
      checked: true,
    },
    {
      id: 2,
      descripcion: "Martes",
      checked: true,
    },
    {
      id: 3,
      descripcion: "Miércoles",
      checked: true,
    },
    {
      id: 4,
      descripcion: "Jueves",
      checked: true,
    },
    {
      id: 5,
      descripcion: "Viernes",
      checked: true,
    },
    {
      id: 6,
      descripcion: "Sábado",
      checked: true,
    },
    {
      id: 7,
      descripcion: "Domingo",
      checked: true,
    },
  ],
  rangoHorario: [
    { id: 0, descripcion: "Todos", checked: true },
    {
      id: 1,
      descripcion: "Mañana",
      horaMin: "07",
      horaMax: "12",
      checked: true,
    },
    {
      id: 2,
      descripcion: "Media tarde",
      horaMin: "12",
      horaMax: "16",
      checked: true,
    },
    {
      id: 3,
      descripcion: "Tarde",
      horaMin: "16",
      horaMax: "19",
      checked: true,
    },
    {
      id: 4,
      descripcion: "Noche",
      horaMin: "19",
      horaMax: "24",
      checked: true,
    },
    {
      id: 5,
      descripcion: "Madrugada",
      horaMin: "00",
      horaMax: "07",
      checked: true,
    },
  ],
  especialistas: [{ id: 0, descripcion: "Todos", checked: true }],
};

export default filtrosReset;
