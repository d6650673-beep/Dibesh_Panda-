import type { ElementType } from 'react';

export type NavLink = {
  href: string;
  label: string;
};

export type SocialLink = {
  id: string;
  name: string;
  url: string;
  icon: ElementType;
  placeholder: string;
};

export type HeroData = {
  name: string;
  title: string;
  introduction: string;
  cvUrl: string;
};

export type AboutData = {
  bio: string;
  profilePhotoUrl: string;
};

export type Skill = {
  id: string;
  name: string;
  level: number;
};

export type Service = {
  id: string;
  icon: string; // Storing icon name as string
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

export type ContactSubmission = {
    id: string;
    name: string;
    email: string;
    message: string;
    submissionDate: {
      seconds: number;
      nanoseconds: number;
    };
  }
