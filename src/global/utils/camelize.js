const camelize = (str) => {    
    //Pascal case renombrar
    if (str !== undefined){

      return str.replace(/\w\S*/g, function(t) { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); });
    }else{
      return "";
    }
  };
  
  export default camelize;