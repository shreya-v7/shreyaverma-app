// Site identity, bio, and social links mirrored from shreyaverma.com.

export const metaData = {
  name: 'Shreya Verma',
  title: 'Shreya Verma',
  description: 'Machine Learning Practitioner and Front-End Developer',
  tagline: 'Deep Learning!',
  taglineAside: 'shallow humor :)',
};

export const bio: string[] = [
  "Hello, I'm Shreya, dedicated science fiction enthusiast and unapologetic geek, diving deep into the captivating worlds of machine learning and deep learning.",
  'Grad student at Carnegie Mellon University, breaking AI until it confesses how it works. Backed by a strong academic foundation and industry experience at Morgan Stanley, I like problems that don\'t have obvious answers.',
  'I chase the uncomfortable questions in ML, why models look intelligent on paper, misbehave in reality, and how to close that gap.',
];

export const socialLinks = {
  twitter: 'https://x.com/shreyasapphire',
  github: 'https://github.com/shreya-v7',
  instagram: 'https://www.instagram.com/shreyaver.ma',
  linkedin: 'https://in.linkedin.com/in/shreya-verma-1sv',
  email: 'mailto:shreya.verma2000@gmail.com',
  code: 'https://leetcode.com/u/shreya_sv/',
};

export type SocialItem = {
  key: keyof typeof socialLinks;
  label: string;
  icon: string; // Ionicons glyph
  href: string;
};

export const socialItems: SocialItem[] = [
  { key: 'twitter', label: 'X', icon: 'logo-twitter', href: socialLinks.twitter },
  { key: 'github', label: 'GitHub', icon: 'logo-github', href: socialLinks.github },
  { key: 'instagram', label: 'Instagram', icon: 'logo-instagram', href: socialLinks.instagram },
  { key: 'linkedin', label: 'LinkedIn', icon: 'logo-linkedin', href: socialLinks.linkedin },
  { key: 'email', label: 'Email', icon: 'mail-outline', href: socialLinks.email },
  { key: 'code', label: 'Code', icon: 'code-slash-outline', href: socialLinks.code },
];
