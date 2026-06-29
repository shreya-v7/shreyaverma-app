// Portfolio app types (mirrors shreyaverma.com data shapes).

export interface Role {
  title: string;
  duration: string;
  content: string[];
  awards?: string;
  techStack: string[];
}

export interface Company {
  company: string;
  logo: string;
  roles: Role[];
}

export interface Certificate {
  title: string;
  date: string;
  image: string;
}

export interface Project {
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  link: string;
  tags: string[];
}

export type AchievementCategory =
  | 'Award'
  | 'Publication'
  | 'Scholarship'
  | 'Certification'
  | 'Hackathon'
  | 'Leadership';

export interface Achievement {
  title: string;
  category: AchievementCategory;
  group?: string;
  date?: string;
  year?: number;
  context: string;
  highlight: string;
  details?: string[];
  link?: string;
}

export interface PersonalPost {
  id: string;
  title?: string;
  caption: string;
  image?: string;
  date?: string;
  tags?: string[];
  link?: string;
  content?: string;
  type: 'books' | 'cinema' | 'blogs';
  metadata?: {
    artist?: string;
    album?: string;
    author?: string;
    book?: string;
    movie?: string;
    show?: string;
    location?: string;
    rating?: number;
    detailedReview?: string[];
  };
}
