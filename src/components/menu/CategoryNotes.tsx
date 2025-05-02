"use client";

import { memo } from 'react';

interface CategoryNotesProps {
  notes: string[];
}

const CategoryNotes = memo(function CategoryNotes({ notes }: CategoryNotesProps) {
  if (!notes || notes.length === 0) return null;
  
  return (
    <div className="mb-6 text-center">
      <div className="inline-block bg-[#1A2A3A]/80 backdrop-blur-sm px-6 py-3 rounded-lg border border-[#E6C78B]/20">
        {notes.map((note, index) => (
          <p 
            key={index} 
            className="text-white/90 font-montserrat text-sm italic"
          >
            {note}
          </p>
        ))}
      </div>
    </div>
  );
});

export default CategoryNotes;
