"use client";

import { memo } from 'react';
import { Course } from '@/types/setLunchMenu';
import SetLunchMenuOptionCard from './SetLunchMenuOptionCard';
import SetLunchFixedItemCard from './SetLunchFixedItemCard';

interface SetLunchCourseSectionProps {
  course: Course;
}

const SetLunchCourseSection = memo(function SetLunchCourseSection({ course }: SetLunchCourseSectionProps) {
  return (
    <div className="mb-16">
      {/* Course heading with decorative elements */}
      <div className="text-center mb-8 relative">
        <h2 className="text-2xl md:text-3xl font-playfair mb-4 relative inline-block">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">
            {course.course_name}
          </span>
          <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
        </h2>
      </div>
      
      {/* Course description if available */}
      {course.description && (
        <div className="text-center mb-8">
          <p className="text-white/80 font-montserrat text-base italic">{course.description}</p>
        </div>
      )}
      
      {/* Selection type indicator */}
      <div className="text-center mb-6">
        <span className="inline-block bg-[#1A2A3A] text-[#E6C78B] text-sm font-medium px-4 py-1 rounded-full border border-[#E6C78B]/30">
          {course.selection_type === 'choice' ? 'Choose One' : 'Fixed Item'}
        </span>
      </div>
      
      {/* Menu items grid */}
      {course.selection_type === 'choice' && course.options && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {course.options.map((option, index) => (
            <SetLunchMenuOptionCard key={`${course.course_name}-${index}`} option={option} />
          ))}
        </div>
      )}
      
      {/* Fixed item */}
      {course.selection_type === 'fixed' && course.item && (
        <div className="max-w-md mx-auto">
          <SetLunchFixedItemCard item={course.item} />
        </div>
      )}
    </div>
  );
});

export default SetLunchCourseSection;
