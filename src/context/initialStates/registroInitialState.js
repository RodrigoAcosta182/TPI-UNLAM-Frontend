const registroInitialState = {
  registro: {
    loading: false,
    error: false,
    data: null,
    registroCampos: {
      matricula: "",
      tipoUsuarioId: 1,
      fechaNacimiento: null,
      nombre: "",
      apellido: "",
      nombreTutor: null,
      dni: "",
      direccion: null,
      telefono: null,
      mail: "",
      contrasena: "",
    },
  },
};

export default registroInitialState;
