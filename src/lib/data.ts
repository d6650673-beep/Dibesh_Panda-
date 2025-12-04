import { Github, Twitter, Linkedin, Code, Paintbrush, Server, BarChart, Instagram, type LucideIcon } from 'lucide-react';
import type { NavLink, SocialLink } from './types';

export const navLinks: NavLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export const defaultSocialLinks: SocialLink[] = [
  { id: 'github', name: 'GitHub', url: '', icon: 'Github', placeholder: 'https://github.com/your-username' },
  { id: 'twitter', name: 'Twitter', url: '', icon: 'Twitter', placeholder: 'https://twitter.com/your-username' },
  { id: 'linkedin', name: 'LinkedIn', url: '', icon: 'Linkedin', placeholder: 'https://linkedin.com/in/your-username' },
  { id: 'instagram', name: 'Instagram', url: '', icon: 'Instagram', placeholder: 'https://instagram.com/your-username' },
];