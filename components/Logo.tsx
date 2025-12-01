import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-10 w-auto" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e2a78" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <path d="M50 15C30.7 15 15 30.7 15 50C15 69.3 30.7 85 50 85C69.3 85 85 69.3 85 50C85 30.7 69.3 15 50 15ZM50 75C36.2 75 25 63.8 25 50C25 36.2 36.2 25 50 25C63.8 25 75 36.2 75 50C75 63.8 63.8 75 50 75Z" stroke="url(#logoGradient)" strokeWidth="6" />
    <path d="M50 35V65M35 50H65" stroke="url(#logoGradient)" strokeWidth="6" strokeLinecap="round" />
    <circle cx="50" cy="50" r="10" fill="url(#logoGradient)" />
  </svg>
);