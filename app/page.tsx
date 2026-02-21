"use client"
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette, Scanline } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import { useReaction } from '../hooks/useReaction';
import Liquid from '../components/Liquid';

export default function ChemicalRoom() {
  const { solution, mixSubstance, setSolution } = useReaction();
  const [isEntered, setIsEntered] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  // Function to handle mixing and logging
  const handleMix = (type: 'acid' | 'base' | 'metal', name: string) => {
    mixSubstance(type);
    setHistory((prev) => [name, ...prev].slice(0, 5));
  };

  const resetLab = () => {
    setSolution({
      name: "Empty Beaker",
      color: "#ffffff",
      ph: 7.0,
      intensity: 0.2,
      equation: "System Reset...",
      particles: 0
    });
    setHistory([]);
  };

  return (
    <main className="relative h-screen w-full bg-[#020202] overflow-hidden text-white font-sans">
      
      {/* 3D RENDER ENGINE */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <color attach="background" args={['#020202']} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color={solution.color} />
          <spotLight position={[0, 5, 0]} intensity={2} distance={10} angle={0.5} />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Liquid 
              color={solution.color} 
              distort={solution.intensity} 
              speed={solution.intensity * 2} 
            />
          </Float>

          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} />
          
          <EffectComposer>
            <Bloom luminanceThreshold={0.1} mipmapBlur intensity={solution.intensity + 0.8} />
            <Scanline opacity={0.1} />
            <Vignette darkness={1.2} />
          </EffectComposer>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      <AnimatePresence mode="wait">
        {!isEntered ? (
          /* LANDING PAGE */
          <motion.div 
            key="hero" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            className="relative z-20 flex flex-col items-center justify-center h-full bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center"
            >
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 italic">
                THE <span className="text-blue-500">ROOM</span>
              </h1>
              <p className="text-white/40 font-mono tracking-[0.4em] mb-12 uppercase text-xs">
                Advanced Molecular Interaction v2.6
              </p>
              <button 
                onClick={() => setIsEntered(true)} 
                className="group relative px-12 py-5 border border-white/20 overflow-hidden transition-all hover:border-blue-500"
              >
                <span className="relative z-10 font-bold uppercase tracking-widest text-sm group-hover:text-blue-400">Initialize Chamber</span>
                <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        ) : (
          /* MAIN LABORATORY UI */
          <motion.div 
            key="ui" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="relative z-10 flex flex-col justify-between h-full p-6 pointer-events-none"
          >
            
            {/* TOP HUD: pH METER & LOGS */}
            <div className="flex justify-between items-start">
              <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl w-full max-w-sm pointer-events-auto transition-all hover:bg-white/10">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">Solution Analysis</p>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[8px] font-bold animate-pulse uppercase">Live</span>
                </div>
                
                <h2 className="text-2xl font-bold truncate uppercase tracking-tight">{solution.name}</h2>
                
                <div className="mt-6">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-[10px] font-mono text-white/40 uppercase">pH Concentration</p>
                    <p className={`text-4xl font-black transition-colors duration-500 ${solution.ph < 6 ? 'text-red-500' : solution.ph > 8 ? 'text-blue-500' : 'text-green-500'}`}>
                      {solution.ph}
                    </p>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: `${(solution.ph / 14) * 100}%`, backgroundColor: solution.color }} 
                      className="h-full shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                    />
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <p className="text-[9px] font-mono text-white/30 uppercase mb-2 italic">Interaction History</p>
                  <div className="space-y-1">
                    {history.map((item, i) => (
                      <p key={i} className="text-[10px] font-mono text-blue-400/60">+ {item}</p>
                    ))}
                    {history.length === 0 && <p className="text-[10px] font-mono text-white/10 italic">No reagents added yet...</p>}
                  </div>
                </div>
              </div>

              <div className="text-right font-mono text-[9px] text-white/20 uppercase tracking-[0.2em] space-y-1">
                <p>Temp: <span className="text-white">298.15 K</span></p>
                <p>Reactant: <span className="text-white">Active</span></p>
                <p className="text-blue-500 font-bold mt-4 border-b border-blue-500/20 pb-1">{solution.equation}</p>
              </div>
            </div>

            {/* INTERACTIVE REAGENT SHELVES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-auto">
              
              {/* SHELF A: ACIDS (RED) */}
              <div className="bg-red-500/5 border border-red-500/10 p-5 backdrop-blur-md rounded-2xl transition-all hover:border-red-500/30 group">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-3 bg-red-500" />
                  <p className="text-red-500 font-mono text-[10px] uppercase font-bold tracking-widest">Shelf 01: Acids</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => handleMix('acid', 'Hydrochloric Acid')} className="w-full text-left px-4 py-3 bg-white/5 hover:bg-red-500 transition-all text-[10px] font-black uppercase rounded-lg border border-white/5">HCl (Hydrochloric)</button>
                  <button onClick={() => handleMix('acid', 'Sulfuric Acid')} className="w-full text-left px-4 py-3 bg-white/5 hover:bg-red-500 transition-all text-[10px] font-black uppercase rounded-lg border border-white/5">H₂SO₄ (Sulfuric)</button>
                </div>
              </div>

              {/* SHELF B: BASES (BLUE) */}
              <div className="bg-blue-500/5 border border-blue-500/10 p-5 backdrop-blur-md rounded-2xl transition-all hover:border-blue-500/30 group">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-3 bg-blue-500" />
                  <p className="text-blue-500 font-mono text-[10px] uppercase font-bold tracking-widest">Shelf 02: Bases</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => handleMix('base', 'Sodium Hydroxide')} className="w-full text-left px-4 py-3 bg-white/5 hover:bg-blue-500 transition-all text-[10px] font-black uppercase rounded-lg border border-white/5">NaOH (Sod. Hydroxide)</button>
                  <button onClick={() => handleMix('base', 'Potassium Hydroxide')} className="w-full text-left px-4 py-3 bg-white/5 hover:bg-blue-500 transition-all text-[10px] font-black uppercase rounded-lg border border-white/5">KOH (Pot. Hydroxide)</button>
                </div>
              </div>

              {/* SHELF C: SPECIAL / RESET */}
              <div className="bg-orange-500/5 border border-orange-500/10 p-5 backdrop-blur-md rounded-2xl transition-all hover:border-orange-500/30 group">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-3 bg-orange-500" />
                  <p className="text-orange-500 font-mono text-[10px] uppercase font-bold tracking-widest">Shelf 03: Reactives</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => handleMix('metal', 'Pure Sodium Metal')} className="w-full text-left px-4 py-3 bg-white/5 hover:bg-orange-500 transition-all text-[10px] font-black uppercase rounded-lg border border-white/5">Sodium Metal (Na)</button>
                  <button onClick={resetLab} className="w-full text-center px-4 py-3 border border-white/20 text-white hover:bg-white hover:text-black transition-all text-[10px] font-black uppercase rounded-lg mt-1 font-mono italic tracking-[0.2em]">Purge Chamber</button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}