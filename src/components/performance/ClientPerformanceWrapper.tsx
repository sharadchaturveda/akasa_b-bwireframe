"use client";

import dynamic from 'next/dynamic';

// Dynamically import the ClientPerformanceMonitor with ssr: false to avoid hydration issues
const ClientPerformanceMonitor = dynamic(
  () => import('./ClientPerformanceMonitor'),
  { ssr: false }
);

// Dynamically import the PreloadLinks with ssr: false to avoid hydration issues
const PreloadLinks = dynamic(
  () => import('./PreloadLinks'),
  { ssr: false }
);

export default function ClientPerformanceWrapper() {
  return (
    <>
      <ClientPerformanceMonitor />
      <PreloadLinks />
    </>
  );
}
