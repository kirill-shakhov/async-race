import {useRef, useEffect, useState} from "react";

type UseCarAnimationReturn = {
  startAnimation: (carRef: HTMLElement, distance: number, duration: number) => void;
  stopAnimation: () => void;
};

const useCarAnimation = (): UseCarAnimationReturn => {
  const [progress, setProgress] = useState(0);
  const animationRequestId = useRef<number | null>(null);
  const animationStartTime = useRef<number | null>(null);

  const updateCarPosition = (
    timestamp: number,
    carRef: HTMLElement,
    distance: number,
    duration: number
  ) => {
    if (!carRef) return;

    if (!animationStartTime.current) {
      animationStartTime.current = timestamp;
    }

    const elapsedTime = timestamp - animationStartTime.current;
    const newProgress = Math.min(elapsedTime / duration, 1);

    setProgress(newProgress);

    const translateX = newProgress * distance;
    carRef.style.transform = `translateX(${translateX}px)`;

    if (newProgress < 1) {
      animationRequestId.current = window.requestAnimationFrame((ts) => updateCarPosition(ts, carRef, distance, duration));
    }
  };

  const startAnimation = (
    carRef: HTMLElement,
    distance: number,
    duration: number
  ) => {
    animationStartTime.current = null;
    animationRequestId.current = window.requestAnimationFrame((timestamp) => updateCarPosition(timestamp, carRef, distance, duration));
  };

  const stopAnimation = () => {
    if (animationRequestId.current) {
      window.cancelAnimationFrame(animationRequestId.current);
      animationRequestId.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopAnimation();
    };
  }, []);

  return {startAnimation, stopAnimation};
};

export default useCarAnimation;
