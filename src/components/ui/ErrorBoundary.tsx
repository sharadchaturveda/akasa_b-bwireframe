"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { WithChildrenProps } from "@/types/common";
import Button from "./button";

/**
 * Props for the ErrorBoundary component
 */
export interface ErrorBoundaryProps extends WithChildrenProps {
  /**
   * Custom fallback component to render when an error occurs
   */
  fallback?: ReactNode;

  /**
   * Whether to log errors to the console
   * @default true
   */
  logErrors?: boolean;

  /**
   * Function to call when an error occurs
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * State for the ErrorBoundary component
 */
interface ErrorBoundaryState {
  /**
   * Whether an error has occurred
   */
  hasError: boolean;

  /**
   * The error that occurred
   */
  error: Error | null;

  /**
   * Information about the error
   */
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary Component
 *
 * A component that catches JavaScript errors in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component
 * tree that crashed.
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <ComponentThatMightError />
 * </ErrorBoundary>
 * ```
 *
 * @example
 * ```tsx
 * <ErrorBoundary
 *   fallback={<CustomErrorComponent />}
 *   onError={(error, errorInfo) => {
 *     // Log error to an error reporting service
 *     reportError(error, errorInfo);
 *   }}
 * >
 *   <ComponentThatMightError />
 * </ErrorBoundary>
 * ```
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to the console
    if (this.props.logErrors !== false) {
      console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    // Update state with error info
    this.setState({
      errorInfo
    });

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Render the fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Otherwise, render the default fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-6 bg-black/90 rounded-lg text-white">
          <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
          <p className="mb-6 text-center text-white/80">
            An error occurred while rendering this component.
          </p>
          <div className="mb-6 max-w-full overflow-auto p-4 bg-black/50 rounded text-sm">
            <p className="font-bold text-red-400">{this.state.error?.toString()}</p>
            {this.state.errorInfo && (
              <pre className="mt-2 text-white/70 whitespace-pre-wrap">
                {this.state.errorInfo.componentStack}
              </pre>
            )}
          </div>
          <Button onClick={this.handleReset}>Try Again</Button>
        </div>
      );
    }

    // Render children if there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;
