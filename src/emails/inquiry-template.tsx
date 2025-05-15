import React from 'react';

interface InquiryTemplateProps {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  preferredDate: string;
  guests: number;
  additionalInfo: string;
}

const InquiryTemplate: React.FC<InquiryTemplateProps> = ({
  fullName,
  email,
  phone,
  eventType,
  preferredDate,
  guests,
  additionalInfo,
}) => {
  return (
    <div>
      <h1>Inquiry from {fullName}</h1>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>EventType: {eventType}</p>
      <p>PreferredDate: {preferredDate}</p>
      <p>Guests: {guests}</p>
      <p>AdditionalInfo: {additionalInfo}</p>
    </div>
  );
};

export default InquiryTemplate;