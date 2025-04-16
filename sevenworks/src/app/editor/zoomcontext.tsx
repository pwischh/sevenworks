"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const ZoomContext = createContext<{
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  setZoom: (z: number) => void;
} | null>(null);

export function ZoomProvider({ children }: { children: ReactNode }) {
  const [zoom, setZoom] = useState(100);

  const zoomIn = () => setZoom((prev) => Math.min(prev + 10, 300));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 10, 30));

  return (
    <ZoomContext.Provider value={{ zoom, zoomIn, zoomOut, setZoom }}>
      {children}
    </ZoomContext.Provider>
  );
}

export function useZoom() {
  const context = useContext(ZoomContext);
  if (!context) {
    throw new Error("useZoom must be used within a ZoomProvider");
  }
  return context;
}