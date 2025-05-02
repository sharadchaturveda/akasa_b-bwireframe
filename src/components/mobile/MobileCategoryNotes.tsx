"use client";

import { memo } from 'react';

interface MobileCategoryNotesProps {
  notes: string[];
}

const MobileCategoryNotes = memo(function MobileCategoryNotes({ notes }: MobileCategoryNotesProps) {
  if (!notes || notes.length === 0) return null;
  
  return (
    <div className="mb-4 text-center">
      <div className="bg-[#1A2A3A]/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#E6C78B]/20">
        {notes.map((note, index) => (
          <p 
            key={index} 
            className="text-white/90 font-montserrat text-xs italic"
          >
            {note}
          </p>
        ))}
      </div>
    </div>
  );
});

export default MobileCategoryNotes;
