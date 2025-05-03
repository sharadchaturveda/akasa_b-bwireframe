"use client";

import { memo } from "react";

interface StandardComponentProps {
  // Define your props here
  title?: string;
  className?: string;
}

/**
 * StandardComponent
 * 
 * A template for creating new components with a standardized structure.
 * This follows the project's best practices for component design.
 * 
 * @param {StandardComponentProps} props - The component props
 */
const StandardComponent = memo(function StandardComponent({
  title = "Default Title",
  className = "",
}: StandardComponentProps) {
  return (
    <section className={`w-full py-12 ${className}`}>
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-playfair mb-6">{title}</h2>
        {/* Component content goes here */}
      </div>
    </section>
  );
});

export default StandardComponent;
