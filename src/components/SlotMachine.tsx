'use client';

import { useState, useEffect, useRef } from 'react';
import { Band } from '@/types/band';

interface SlotMachineProps {
  bands: Band[];
  onBandSelected: (band: Band) => void;
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
}

export default function SlotMachine({ bands, onBandSelected, isRunning, setIsRunning }: SlotMachineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayBands, setDisplayBands] = useState<Band[]>(bands);
  const [selectedBandName, setSelectedBandName] = useState<string>('');
  const [showSelected, setShowSelected] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isRunning && !showSelected) {
      setDisplayBands(bands);
      setCurrentIndex(bands.length * 2); // 5セットの中央から開始
    }
  }, [bands, isRunning, showSelected]);

  const startLottery = () => {
    if (isRunning || bands.length === 0) return;
    
    setIsRunning(true);
    setShowSelected(false);
    setDisplayBands(bands);
    setCurrentIndex(bands.length * 2);
    
    const finalIndex = Math.floor(Math.random() * bands.length);
    const selectedBand = bands[finalIndex];
    const finalPosition = bands.length * 2 + finalIndex;
    
    const totalDistance = bands.length * 2 + finalIndex; // 2周 + 最終位置
    const duration = 3000; // 3秒
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // イージング関数（最初は速く、最後は遅く）
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newPos = bands.length * 2 + (totalDistance * easeOut);
      
      setCurrentIndex(newPos);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentIndex(finalPosition);
        setSelectedBandName(selectedBand.name);
        setShowSelected(true);
        setTimeout(() => {
          onBandSelected(selectedBand);
          setIsRunning(false);
        }, 500);
      }
    };
    
    requestAnimationFrame(animate);
  };



  return (
    <div className="slot-machine">
      <div className="slot" ref={slotRef}>
        <div className="slot-window">
          {[...displayBands, ...displayBands, ...displayBands, ...displayBands, ...displayBands].map((band, index) => {
            const position = index - currentIndex;
            const isActive = !isRunning && Math.abs(position) < 0.5;
            return (
              <div
                key={index}
                className={`slot-item ${isActive ? 'active' : ''}`}
                style={{
                  transform: `translateY(${position * 100}px)`,
                  opacity: Math.abs(position) <= 3 ? 1 : 0
                }}
              >
                {band.name}
              </div>
            );
          })}
        </div>
        <div className="slot-highlight"></div>
      </div>
      
      <button
        onClick={startLottery}
        disabled={isRunning || displayBands.length === 0}
        className="lottery-btn"
      >
        {isRunning ? '抽選中...' : '抽選開始'}
      </button>
    </div>
  );
}