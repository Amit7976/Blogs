import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export interface Blog {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  imageTitle: string;
  tags: string;
  category: string;
  status: string;
  count: number;
  created_at: Date;
  updated_at: Date;
  date: Date;
}
