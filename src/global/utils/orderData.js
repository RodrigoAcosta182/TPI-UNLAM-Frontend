const parserString = (str) => {
  if (str) {
    str = str
      .toUpperCase()
      .normalize("NFD")
      .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
      .replace(/ /g, "");
  } else str = "";
  return str;
};

const parseStringArray = (str) => {
  str = str.split(" ");
  const newArray = [];
  str.forEach((element) => {
    if (element !== "") {
      newArray.push(element);
    }
  });
  return newArray;
};
export const orderLista = (datos, palabra, origen, param) => {
  if (Array.isArray(datos) && typeof palabra === "string") {
    palabra = parseStringArray(palabra);
    for (let index = 0; index < palabra.length; index++) {
      const elementOne = palabra[index];
      datos = datos.filter((elementTwo) => {
        let encontrado = false;
        if ( 
          parserString(
            origen && origen === "OBRA_SOCIAL"
              ? elementTwo.nombre:  
              origen && origen === "CUSTOM" ?
               JSON.stringify(elementTwo[param])
              : elementTwo.descripcion
          ).includes(parserString(elementOne)) ||
          parserString(
            origen && origen === "OBRA_SOCIAL"
              ? elementTwo.codigo
              : elementTwo.tags
          ).includes(parserString(elementOne))
        ) {
          encontrado = true;
        }
        return encontrado;
      });
    }

    return datos;
  } else return datos;
};


export const newOrderLista = (datos, params, strCompare) => {
     
  // primero transformamos el strCompare en un str; 
  let valueSearching = typeof strCompare === "string"? strCompare: JSON.stringify(strCompare); 

  // luego hacemos que se transforme en un array 
  // EJ: "se ba" => ["s", "e", "b", "a"]
  valueSearching = parseStringArray(valueSearching); 

  // Recorremos el strCompare y filtramos la lista 
  valueSearching.forEach( value => {

      // filtramos los datos teniendo en cuenta los params
      datos = datos.filter((dato)  => {
          // Nueva recorrida para obtener los diferentes param 
          for (let index = 0; index < params.length; index++) {
              let element = dato[params[index]];
              element = JSON.stringify(element)
              if(parserString(element).includes(parserString(value))){
                  return true
              }
          }
      });

  })  
  return datos

};