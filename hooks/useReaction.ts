// hooks/useReaction.ts
import { useState } from 'react';

export const useReaction = () => {
  const [solution, setSolution] = useState({
    name: "Empty Beaker",
    color: "#ffffff",
    ph: 7.0,
    intensity: 0.2,
    equation: "Waiting for reagents...",
    particles: 0
  });

  // Updated to accept the chemical name and its pH impact strength
  const mixSubstance = (type: 'acid' | 'base' | 'metal', chemName: string, strength: number) => {
    setSolution((prev) => {
      let newPh = prev.ph;
      let newColor = prev.color;
      let newName = prev.name;
      let newEq = prev.equation;

      if (type === 'acid') {
        newPh = Math.max(1, prev.ph - strength);
        newColor = `hsl(0, 100%, ${40 + newPh * 5}%)`;
        newName = `${chemName} Solution`;
        newEq = `H₃O⁺ Concentration Increased by ${chemName}`;
      } else if (type === 'base') {
        newPh = Math.min(14, prev.ph + strength);
        newColor = `hsl(240, 100%, ${40 + (14 - newPh) * 5}%)`;
        newName = `${chemName} Solution`;
        newEq = `OH⁻ Concentration Increased by ${chemName}`;
      } else if (type === 'metal') {
        newColor = "#f39c12";
        newName = "Exothermic Metal Reaction";
        newEq = "2Na + 2H₂O → 2NaOH + H₂↑";
      }

      // Neutralization Logic
      if (Math.abs(newPh - 7) < 0.5) {
        newPh = 7.0;
        newColor = "#2ecc71";
        newName = "Neutralized Salt Solution";
        newEq = "Acid + Base → Salt + H₂O";
      }

      return {
        ...prev,
        ph: Number(newPh.toFixed(1)),
        color: newColor,
        name: newName,
        equation: newEq,
        intensity: Math.abs(7 - newPh) * 0.5 + 0.2
      };
    });
  };

  return { solution, mixSubstance, setSolution }; 
};