// src/types/cafe.ts
export interface Cafe {
  id: string;
  name: string;
  description: string;
  logo: string;
  location: string;
  employees: number;
}

export interface CafePayload {
  name: string;
  description: string;
  logo: string;
  location: string;
}