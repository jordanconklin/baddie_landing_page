import React from 'react';
import styled from '@emotion/styled';

interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Benefit>
      <BenefitIcon>{icon}</BenefitIcon>
      <BenefitTitle>{title}</BenefitTitle>
      <BenefitText>{description}</BenefitText>
    </Benefit>
  );
};

const Benefit = styled.div`
  text-align: center;
  padding: 1rem;
  flex: 1;
  max-width: 200px;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const BenefitIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.75rem;
  color: #4b4b4b;
`;

const BenefitTitle = styled.h3`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const BenefitText = styled.p`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  color: #666;
  line-height: 1.4;
`;
