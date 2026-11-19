// File path: src/lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Ye function dynamic Tailwind classes ko safely merge karta hai (ShadCN UI ka core function)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}