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

  const mixSubstance = (type: 'acid' | 'base' | 'metal' | 'neutral') => {
    setSolution((prev) => {
      let newPh = prev.ph;
      let newColor = prev.color;
      let newName = prev.name;
      let newEq = prev.equation;

      if (type === 'acid') {
        newPh = Math.max(1, prev.ph - 1.5);
        newColor = `hsl(0, 100%, ${40 + newPh * 5}%)`;
        newName = newPh < 4 ? "Strong Acidic Solution" : "Weak Acidic Solution";
        newEq = "H₃O⁺ Concentration Increasing";
      } else if (type === 'base') {
        newPh = Math.min(14, prev.ph + 1.5);
        newColor = `hsl(240, 100%, ${40 + (14 - newPh) * 5}%)`;
        newName = newPh > 10 ? "Strong Basic Solution" : "Weak Basic Solution";
        newEq = "OH⁻ Concentration Increasing";
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

  // ADD setSolution HERE:
  return { solution, mixSubstance, setSolution }; 
};