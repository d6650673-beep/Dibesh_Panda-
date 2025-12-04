import type { ElementType } from 'react';

export type SocialLink = {
  name: string;
  url: string;
  icon: ElementType;
};

export type Skill = {
  name: string;
  level: number; // 0-100
};

export type Service = {
  icon: ElementType;
  title: string;
  description: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  imageUrl: string;
  imageHint: string;
  liveUrl?: string;
  githubUrl?: string;
};

export type NavLink = {
  href: string;
  label: string;
};
