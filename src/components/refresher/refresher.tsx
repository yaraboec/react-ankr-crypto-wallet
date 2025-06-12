import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

import { REFRESH_INTERVAL_MS } from "config";

import "./refresher.scss";

interface RefresherProps {
  readonly canRefresh: boolean;
  readonly actionOnRefresh: () => void;
}

const REFRESH_INTERVAL_SECONDS = REFRESH_INTERVAL_MS / 1000;

export default function Refresher({
  actionOnRefresh,
  canRefresh,
}: RefresherProps) {
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(REFRESH_INTERVAL_SECONDS);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoRefresh && canRefresh) {
      intervalRef.current = setInterval(() => {
        actionOnRefresh();
        setSecondsLeft(REFRESH_INTERVAL_SECONDS);
      }, REFRESH_INTERVAL_MS);

      countdownRef.current = setInterval(() => {
        setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
      clearInterval(countdownRef.current!);
      intervalRef.current = null;
      countdownRef.current = null;
      setSecondsLeft(REFRESH_INTERVAL_SECONDS);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRefresh, canRefresh, actionOnRefresh]);

  return (
    <div className="refresher">
      <Button
        className="refresh-button"
        disabled={!canRefresh}
        variant={autoRefresh ? "danger" : "success"}
        onClick={() => {
          setAutoRefresh((prev) => !prev);
        }}
      >
        {autoRefresh ? `Auto-Refresh (${secondsLeft}s)` : "Auto-Refresh"}
      </Button>
    </div>
  );
}
