"use client";

import { memo } from 'react';
import { Course } from '@/types/setLunchMenu';
import MobileSetLunchMenuOptionCard from './MobileSetLunchMenuOptionCard';
import MobileSetLunchFixedItemCard from './MobileSetLunchFixedItemCard';

interface MobileSetLunchCourseSectionProps {
  course: Course;
}

const MobileSetLunchCourseSection = memo(function MobileSetLunchCourseSection({ course }: MobileSetLunchCourseSectionProps) {
  return (
    <div className="mb-10">
      {/* Course heading with decorative elements */}
      <div className="text-center mb-4 relative">
        <h2 className="text-xl font-playfair mb-3 relative inline-block">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">
            {course.course_name}
          </span>
          <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
        </h2>
      </div>
      
      {/* Course description if available */}
      {course.description && (
        <div className="text-center mb-4">
          <p className="text-white/80 font-montserrat text-sm italic">{course.description}</p>
        </div>
      )}
      
      {/* Selection type indicator */}
      <div className="text-center mb-4">
        <span className="inline-block bg-[#1A2A3A] text-[#E6C78B] text-xs font-medium px-3 py-1 rounded-full border border-[#E6C78B]/30">
          {course.selection_type === 'choice' ? 'Choose One' : 'Fixed Item'}
        </span>
      </div>
      
      {/* Menu items stack */}
      {course.selection_type === 'choice' && course.options && (
        <div className="flex flex-col gap-3">
          {course.options.map((option, index) => (
            <MobileSetLunchMenuOptionCard key={`${course.course_name}-${index}`} option={option} />
          ))}
        </div>
      )}
      
      {/* Fixed item */}
      {course.selection_type === 'fixed' && course.item && (
        <div>
          <MobileSetLunchFixedItemCard item={course.item} />
        </div>
      )}
    </div>
  );
});

export default MobileSetLunchCourseSection;
