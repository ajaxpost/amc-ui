import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createUrl(url: string, params: Record<string, unknown>) {
  const searchParams = new URLSearchParams();

  for (const key in params) {
    searchParams.set(key, String(params[key]));
  }

  return `${url}?${searchParams.toString()}`;
}
