export type Locale = "en" | "bn";
export type LocalizedText = Record<Locale, string>;

export type ProjectLinkType = "live" | "github" | "playstore";

export interface ProfileSocial {
  type: "github" | "linkedin" | "phone" | "email" | "resume";
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  avatar: string;
  avatar_icon: string;
  role: LocalizedText;
  location: LocalizedText;
  socials: ProfileSocial[];
}

export interface Project {
  key: string;
  title: LocalizedText;
  description: LocalizedText;
  types: string[];
  cover: string;
  links: Partial<Record<ProjectLinkType, string>>;
  technologies: string[];
}

export interface Experience {
  key: string;
  company: LocalizedText;
  role: LocalizedText;
  type: LocalizedText;
  duration: LocalizedText;
  url: string;
  description: Record<Locale, string[]>;
  technologies: string[];
}

export interface Technology {
  name: string;
  title: string;
  icon: string;
  categories: string[];
}

export interface Achievement {
  title: LocalizedText;
  date: LocalizedText;
  image: string;
  url: string;
  details: LocalizedText[];
}

export interface EducationItem {
  institution: LocalizedText;
  program: LocalizedText;
  duration: LocalizedText;
  url: string;
}

export interface Hobby {
  title: LocalizedText;
  emoji: string;
}

export interface SupportData {
  title: LocalizedText;
  message: LocalizedText;
  label: LocalizedText;
  image: string;
  url: string;
}

export interface Meme {
  title: string;
  text: string;
  image: string;
  realityCheck: string;
}

export function localize(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.en;
}
