import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomMetrics(url: string) {
  const hash = url.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  return {
    botPercentage: Math.floor(seededRandom(hash) * 30 + 5),
    riskScore: Math.floor(seededRandom(hash + 1) * 60 + 20),
    suspiciousActivities: Math.floor(seededRandom(hash + 2) * 500 + 100),
    totalFollowers: Math.floor(seededRandom(hash + 3) * 10000 + 1000),
    botFollowers: Math.floor(seededRandom(hash + 4) * 3000 + 200),
    engagementRate: (seededRandom(hash + 5) * 15 + 2).toFixed(2),
    automatedPosts: Math.floor(seededRandom(hash + 6) * 200 + 50),
    spamContent: Math.floor(seededRandom(hash + 7) * 150 + 20),
  };
}