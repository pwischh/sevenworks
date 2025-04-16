// src/components/ClientProviders.tsx
"use client";

import React from "react";
import { AuthProvider } from "../app/authContext";
import { ZoomProvider } from "../app/editor/zoomcontext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ZoomProvider>
        {children}
      </ZoomProvider>
    </AuthProvider>
  );
}