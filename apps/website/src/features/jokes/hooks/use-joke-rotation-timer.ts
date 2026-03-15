import { useEffect, useRef, useState } from "react";

type UseJokeRotationTimerParams = {
  enabled: boolean;
  intervalMs: number;
  onTick: () => Promise<void>;
};

export function useJokeRotationTimer({ enabled, intervalMs, onTick }: UseJokeRotationTimerParams) {
  const isTickInFlight = useRef(false);
  const [secondsUntilNextTick, setSecondsUntilNextTick] = useState<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setSecondsUntilNextTick(null);
      return;
    }

    let nextTickAt = Date.now() + intervalMs;

    setSecondsUntilNextTick(Math.ceil(intervalMs / 1000));

    const countdownIntervalId = setInterval(() => {
      const remainingMs = nextTickAt - Date.now();
      setSecondsUntilNextTick(Math.max(0, Math.ceil(remainingMs / 1000)));
    }, 250);

    const intervalId = setInterval(() => {
      if (isTickInFlight.current) {
        return;
      }

      nextTickAt = Date.now() + intervalMs;
      setSecondsUntilNextTick(Math.ceil(intervalMs / 1000));

      isTickInFlight.current = true;

      void onTick().finally(() => {
        isTickInFlight.current = false;
      });
    }, intervalMs);

    return () => {
      clearInterval(countdownIntervalId);
      clearInterval(intervalId);
    };
  }, [enabled, intervalMs, onTick]);

  return {
    secondsUntilNextTick,
  };
}
