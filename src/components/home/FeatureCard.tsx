
import React, { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  color
}) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-border hover:border-tamil-DEFAULT/50 shadow-sm hover:shadow-md transition-all duration-300 p-5 h-full hover-scale">
      <div className={`p-3 rounded-lg w-fit ${color} mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-medium text-neutral-text-dark mb-2">{title}</h3>
      <p className="text-sm text-neutral-text-medium">{description}</p>
    </div>
  );
};

export default FeatureCard;
