const calculaEdad = (e) => {
    let fecha = e.slice(0, -9);
    var birthdate = new Date(fecha);
    var cur = new Date();
    var diff = cur-birthdate; // This is the difference in milliseconds
    var age = Math.floor(diff/31557600000); // Divide by 1000*60*60*24*365.25
    return age;
  };
  export default calculaEdad;