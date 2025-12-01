import { ReactNode } from "react";

export interface NavItem {
  label: string;
  href: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  education?: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

export interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}