import { Github, Twitter, Linkedin, Code, Paintbrush, Server, BarChart } from 'lucide-react';
import type { NavLink, SocialLink } from './types';

export const navLinks: NavLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export const defaultSocialLinks: SocialLink[] = [
  { id: 'github', name: 'GitHub', url: 'https://github.com', icon: Github, placeholder: 'https://github.com/your-username' },
  { id: 'twitter', name: 'Twitter', url: 'https://twitter.com', icon: Twitter, placeholder: 'https://twitter.com/your-username' },
  { id: 'linkedin', name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin, placeholder: 'https://linkedin.com/in/your-username' },
];
