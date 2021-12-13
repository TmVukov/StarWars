export interface SpeciesResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Specie[];
}

export interface Specie {
  classification: string;
  designation: string;
  language: string;
  name: string;
  people: People[];
}

export enum SpecieType {
  Human = 'Human',
  Droid = 'Droid',
  Wookie = 'Wookie',
}

export interface People {
  name: string;
}

export interface VehiclesResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Vehicle[];
}

export interface Vehicle {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  created: string;
  deletable?: boolean;
}

export interface StarshipResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Starship[];
}

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  starship_class: string;
  films: string[];
}

export interface Movies {
  title: string;
  episode_id: number;
  release_date: string;
}
