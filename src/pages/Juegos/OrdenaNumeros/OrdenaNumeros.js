import * as React from "react";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";
import "./OrdenaNumeros.css";

const OrdenaNumeros = () => {
  const initialItems = ["4", "2", "1", "3"];
  const [items, setItems] = useState(initialItems);

  const enviarNumerosOrdenados = () => {
    console.log(items);
  };
  return (
    <>
      <h1 className="c-white">ORDENAR NUMEROS</h1>
      <Reorder.Group axis="y" onReorder={setItems} values={items} className="listaNumeros">
        {items.map((item) => (
          <Item key={item} item={item} />
        ))}
      </Reorder.Group>
      <button onClick={enviarNumerosOrdenados}>Enviar</button>
    </>
  );
};

export default OrdenaNumeros;
