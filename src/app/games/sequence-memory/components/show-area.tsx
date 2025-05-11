import { useEffect, useState } from 'react';

export const ShowArea = ({
  seq,
  setShowArea,
}: {
  seq: number[];
  setShowArea: (value: boolean) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    setCurrentIndex(0);
    setActiveId(null);
  }, [seq]);

  useEffect(() => {
    if (currentIndex >= seq.length) {
      setShowArea(false);
      return;
    }

    const id = seq[currentIndex];
    setActiveId(id);

    const hideTimer = setTimeout(() => {
      setActiveId(null);
    }, 500);

    const nextTimer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [currentIndex, seq, setShowArea]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, id) => (
        <div
          key={id}
          className={`
            w-[120px] h-[120px] rounded 
            transition-colors duration-300 ease-in-out
            ${activeId === id ? "bg-blue-50" : "bg-[#6399d6]"}
          `}
        />
      ))}
    </div>
  );
};