const registroInitialState = {
  registro: {
    loading: false,
    error: null,
    data: null,
    registroCampos: {
      matricula: "",
      tipoUsuarioId: 1,
      fechaNacimiento: null,
      nombre: "",
      apellido: "",
      dni: "",
      mail: "",
      contrasena: "",
    },
  },
};

export default registroInitialState;
