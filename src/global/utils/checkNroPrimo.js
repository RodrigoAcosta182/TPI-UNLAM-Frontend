const checkNroPrimo = (e) => {
  // Casos especiales
	if (e === 0 || e === 1 || e === 4) return false;
	for (let x = 2; x < e / 2; x++) {
		if (e % x === 0) return false;
	}
	// Si no se pudo dividir por ninguno de los de arriba, sí es primo
	return true;
};
export default checkNroPrimo;
