import { Github, Twitter, Linkedin, Code, Paintbrush, Server, BarChart } from 'lucide-react';
import type { Project, Service, Skill, SocialLink, NavLink } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const personalData = {
  name: 'Alex Doe',
  title: 'Full-Stack Developer & UI/UX Enthusiast',
  introduction:
    'Crafting seamless digital experiences from concept to deployment. I specialize in building modern, responsive web applications with a focus on performance and user-centric design.',
  bio: "Hello! I'm Alex, a passionate developer with a knack for turning complex problems into beautiful, intuitive solutions. With over 5 years of experience in the industry, I've had the pleasure of working on a variety of projects, from small business websites to large-scale enterprise applications. My approach combines technical expertise with a creative eye, ensuring that every project is not only functional but also visually compelling. When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or hiking in the great outdoors.",
  profilePhoto: PlaceHolderImages.find((img) => img.id === 'profile-photo'),
};

export const navLinks: NavLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com', icon: Github },
  { name: 'Twitter', url: 'https://twitter.com', icon: Twitter },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
];

export const skills: Skill[] = [
  { name: 'React / Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js / Express', level: 85 },
  { name: 'Firebase / Firestore', level: 90 },
  { name: 'Tailwind CSS', level: 98 },
  { name: 'UI/UX Design', level: 80 },
];

export const services: Service[] = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Building fast, responsive, and scalable web applications tailored to your needs using the latest technologies.',
  },
  {
    icon: Paintbrush,
    title: 'UI/UX Design',
    description: 'Creating intuitive and engaging user interfaces that provide a seamless user experience and reflect your brand identity.',
  },
  {
    icon: Server,
    title: 'Backend & APIs',
    description: 'Developing robust server-side logic, database schemas, and RESTful APIs to power your applications.',
  },
  {
    icon: BarChart,
    title: 'Firebase Integration',
    description: 'Leveraging the full power of Firebase for authentication, database, storage, and hosting solutions.',
  },
];

const projectImages = {
  proj1: PlaceHolderImages.find((img) => img.id === 'project-1'),
  proj2: PlaceHolderImages.find((img) => img.id === 'project-2'),
  proj3: PlaceHolderImages.find((img) => img.id === 'project-3'),
};

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce site with product listings, a shopping cart, and a secure checkout process, built with Next.js and Stripe.',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    imageUrl: projectImages.proj1?.imageUrl || '',
    imageHint: projectImages.proj1?.imageHint || 'web application',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'proj-2',
    title: 'Project Management Tool',
    description:
      'A collaborative Kanban-style project management app with real-time updates using Firestore, drag-and-drop functionality, and user authentication.',
    tech: ['React', 'Firebase', 'Zustand', 'Styled Components'],
    imageUrl: projectImages.proj2?.imageUrl || '',
    imageHint: projectImages.proj2?.imageHint || 'mobile app',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'proj-3',
    title: 'Data Analytics Dashboard',
    description: 'An interactive dashboard for visualizing complex data sets, featuring various chart types, data filtering, and export options.',
    tech: ['Vite', 'D3.js', 'Python (Flask)', 'PostgreSQL'],
    imageUrl: projectImages.proj3?.imageUrl || '',
    imageHint: projectImages.proj3?.imageHint || 'dashboard analytics',
    liveUrl: '#',
  },
];
