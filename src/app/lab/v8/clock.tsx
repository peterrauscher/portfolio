"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

/** Local clock, blank until hydrated so server and client don't disagree. */
export function Clock() {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      }),
    () => "",
  );
  return <span className="tabular-nums">{time}</span>;
}
