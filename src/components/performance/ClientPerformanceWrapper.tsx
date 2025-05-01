"use client";

import dynamic from 'next/dynamic';

// Dynamically import the ClientPerformanceMonitor with ssr: false to avoid hydration issues
const ClientPerformanceMonitor = dynamic(
  () => import('./ClientPerformanceMonitor'),
  { ssr: false }
);

export default function ClientPerformanceWrapper() {
  return <ClientPerformanceMonitor />;
}
