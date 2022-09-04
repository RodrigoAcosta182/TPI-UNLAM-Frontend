import React from "react";
import { useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import "./ColorCorrecto.css";

export default function ColorCorrecto() {
  const [selected, setSelected] = useState(colors[0]);

  const enviarColorCorrecto =() =>{
    console.log(selected);
  } 

  return ( <>
    <AnimateSharedLayout>
      <ul className="colorCorrecto-ul">
        {colors.map(color => (
          <Item
            key={color}
            color={color}
            isSelected={selected === color}
            onClick={() => setSelected(color)}
          />
        ))}
      </ul>
    </AnimateSharedLayout>
    <button onClick={enviarColorCorrecto}>Enviar</button>
  </>
  );
}

function Item({ color, isSelected, onClick }) {
  return (
    <li className="colorCorrecto-li" onClick={onClick} style={{ backgroundColor: color }}>
      {isSelected && (
        <motion.div
          layoutId="outline"
          className="colorCorrecto-outline"
          initial={false}
          animate={{ borderColor: color }}
          transition={spring}
        />
      )}
    </li>
  );
}

const colors = ["#ff0055", "#0099ff", "#22cc88", "#ffaa00"];

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30
};

