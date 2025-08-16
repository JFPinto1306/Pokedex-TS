import { url } from "inspector";
import {Cache, CacheEntry} from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  async fetchAndCache<T>(url: string): Promise<T> {
    const cached = this.cache.get<T>(url);
    if (cached) {
        return cached;
    }
    const response = await fetch(url, { method: 'GET', mode: 'cors' });
    const data: T = await response.json();
    this.cache.add(url, data); // Store the real, parsed data!
    return data;
  } 

  async fetchLocations(url: string): Promise <LocationArea> {
    return this.fetchAndCache(url);
  }

  async fetchLocationDetails(url: string): Promise<Location> {
    return this.fetchAndCache(url);
  }

}



export type LocationArea = {
  count: number
  next: string | null
  previous: string | null  // Can be null when on first page
  results: {
    name: string,
    url: string,
  }[];
};

export interface Location {
  encounter_method_rates: EncounterMethodRate[]
  game_index: number
  id: number
  location: LocationShallow
  name: string
  names: Name[]
  pokemon_encounters: PokemonEncounter[]
}

export interface EncounterMethodRate {
  encounter_method: EncounterMethod
  version_details: VersionDetail[]
}

export interface EncounterMethod {
  name: string
  url: string
}

export interface VersionDetail {
  rate: number
  version: Version
}

export interface Version {
  name: string
  url: string
}

export interface LocationShallow {
  name: string
  url: string
}

export interface Name {
  language: Language
  name: string
}

export interface Language {
  name: string
  url: string
}

export interface PokemonEncounter {
  pokemon: Pokemon
  version_details: VersionDetail2[]
}

export interface Pokemon {
  name: string
  url: string
}

export interface VersionDetail2 {
  encounter_details: EncounterDetail[]
  max_chance: number
  version: Version2
}

export interface EncounterDetail {
  chance: number
  condition_values: any[]
  max_level: number
  method: Method
  min_level: number
}

export interface Method {
  name: string
  url: string
}

export interface Version2 {
  name: string
  url: string
}
