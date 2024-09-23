import {useRef, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {addToRaceResult} from "@moduleGarage/store";

type UseCarAnimationReturn = {
  startAnimation: (carRef: HTMLElement, distance: number, duration: number, id: number) => void;
  stopAnimation: (id: number) => void;
};

const useCarAnimation = (): UseCarAnimationReturn => {
  const isRaceStarted = useAppSelector(state => state.garage.isRaceStarted);
  const dispatch = useAppDispatch();

  const carAnimations = useRef<{
    [key: number]: { progress: number, animationRequestId: number | null, animationStartTime: number | null }
  }>({});

  const updateCarPosition = (timestamp, carRef, distance, duration, id) => {
    if (!carRef || !carAnimations.current[id]) return;

    const {animationStartTime} = carAnimations.current[id];
    if (!animationStartTime) {
      carAnimations.current[id].animationStartTime = timestamp;
    }

    const elapsedTime = timestamp - carAnimations.current[id].animationStartTime!;
    const newProgress = Math.min(elapsedTime / duration, 1);

    carAnimations.current[id].progress = newProgress;

    const translateX = newProgress * distance;
    carRef.style.transform = `translateX(${translateX}px)`;

    if (newProgress < 1) {
      carAnimations.current[id].animationRequestId = window.requestAnimationFrame((ts) =>
        updateCarPosition(ts, carRef, distance, duration, id)
      );
    }

    if (isRaceStarted && newProgress >= 1) {
      dispatch(addToRaceResult({
        id: id,
        time: +((duration / 1000).toFixed(2))
      }));
    }
  };


  const startAnimation = (carRef, distance, duration, id) => {
    carAnimations.current[id] = {progress: 0, animationRequestId: null, animationStartTime: null};
    carAnimations.current[id].animationRequestId = window.requestAnimationFrame((timestamp) =>
      updateCarPosition(timestamp, carRef, distance, duration, id)
    );
  };

  const stopAnimation = (id: number) => {
    if (carAnimations.current[id]?.animationRequestId) {
      window.cancelAnimationFrame(carAnimations.current[id].animationRequestId!);
      carAnimations.current[id] = {progress: 0, animationRequestId: null, animationStartTime: null};
    } else {
      console.log("No active animation found for car with id: ${id}");
    }
  };

  useEffect(() => {
    return () => {
      Object.keys(carAnimations.current).forEach((id) => stopAnimation(Number(id)));
    };
  }, []);

  return {startAnimation, stopAnimation};
};

export default useCarAnimation;