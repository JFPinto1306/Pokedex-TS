import {Cache, CacheEntry} from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<LocationArea> {
    let url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/?offset=0&limit=20`;

    const response = await fetch(url, {
      method: 'GET',
      mode: "cors",
    });

    const cache = new Cache(500);
    cache.add(url,response.json());


    return response.json();
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
  
}
