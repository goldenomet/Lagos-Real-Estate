import React, { useEffect, useState } from 'react';
import { Landmark } from 'lucide-react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer, [onclick]');
        setIsPointer(!!interactive);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Subtle Trailing Pulse Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-red-500/40 pointer-events-none"
        animate={{
          x: position.x - (isPointer ? 22 : 16),
          y: position.y - (isPointer ? 22 : 16),
          width: isPointer ? 44 : 32,
          height: isPointer ? 44 : 32,
          scale: isClicked ? 0.75 : 1,
          opacity: isPointer ? 0.8 : 0.4
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 400,
          mass: 0.3
        }}
      />

      {/* Main Logo Cursor (Red Landmark Icon with Precision Tip) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
        animate={{
          x: position.x - 7,
          y: position.y - 7,
          scale: isClicked ? 0.85 : isPointer ? 1.25 : 1,
          rotate: isPointer ? -8 : 0
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 800,
          mass: 0.1
        }}
      >
        <div className="relative flex items-center justify-center p-0.5 rounded-full bg-white/90 shadow-sm border border-red-600/30">
          <Landmark className="w-4 h-4 text-red-600 fill-red-600" />
        </div>
      </motion.div>
    </div>
  );
};
