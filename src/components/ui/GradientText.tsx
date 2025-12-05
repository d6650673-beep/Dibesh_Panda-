'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface GradientTextProps {
    children: React.ReactNode;
    className?: string;
    colors?: string[];
    animationSpeed?: number;
    showBorder?: boolean;
}

export default function GradientText({
  children,
  className = '',
  colors = ['#4B0082', '#800080', '#4B0082', '#800080', '#4B0082'],
  animationSpeed = 8,
  showBorder = false
}: GradientTextProps) {

  const gradientStyle = {
    '--gradient-background-image': `linear-gradient(to right, ${colors.join(', ')})`,
    '--animation-duration': `${animationSpeed}s`
  } as React.CSSProperties;

  return (
    <div className={cn('animated-gradient-text', className)} style={gradientStyle}>
      {showBorder && <div className="gradient-overlay"></div>}
      <div className="text-content">
        {children}
      </div>
    </div>
  );
}
