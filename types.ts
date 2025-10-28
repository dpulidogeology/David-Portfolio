import React from 'react';

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  videoUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Skill {
  name: string;
  // FIX: Added React import to define React.ComponentType
  icon: React.ComponentType<{ className?: string }>;
}