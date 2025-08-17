import {State} from "./state.js";
import {PokemonShallow, Location} from "./poke_api.js";

export async function commandExplore(state: State,...args: string[]): Promise<void> {
    
    
    if (!args[0]) {
        console.error("Please provide a location area name.");
        return;
    }
    const LocationDetailURL = `https://pokeapi.co/api/v2/location-area/${args[0]}`;
    
    try {
        const details: Location = await state.pokeObj.fetchLocationDetails(LocationDetailURL);
        console.log("Found Pokemon:")

        for (const encounter of details.pokemon_encounters) {
            const pokemon: PokemonShallow = encounter.pokemon;
            console.log(`- ${pokemon.name}`);
        }
        
    } catch (e) {
        console.error("Error fetching location details:", e);
    }
}