"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface Props {
  className?: string;
  time: number; // в миллисекундах
  onComplete?: () => void; // callback при завершении
  autoStart?: boolean; // запускать ли автоматически
}

export const LineTimer = ({
  className = "",
  time,
  onComplete,
  autoStart = true,
}: Props) => {
  const [percent, setPercent] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const animationRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  const animate = useCallback(
    (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current + elapsedRef.current;
      const progress = Math.min((elapsed / time) * 100, 100);

      // Обновляем прогресс только при значительном изменении
      if (Math.abs(progress - percent) > 1) {
        setPercent(progress);
      }

      if (progress >= 100) {
        onComplete?.();
        setIsRunning(false);
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    },
    [time, onComplete, percent]
  );

  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, animate]);

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      startRef.current = 0;
    }
    reset();
  }, [isRunning]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setPercent(0);
    elapsedRef.current = 0;
    startRef.current = 0;
    cancelAnimationFrame(animationRef.current);
    if (autoStart) {
      setIsRunning(true);
    }
  }, [autoStart]);

  useEffect(() => start(), []);

  return (
    <div className={`w-[200px] ${className}`}>
      <progress className="w-full h-2 rounded" value={percent} max="100" />
    </div>
  );
};
