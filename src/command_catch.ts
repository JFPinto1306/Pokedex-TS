import {Pokemon} from './poke_api';
import {State} from "./state.js";

export async function commandCatch(state: State,...args: string[]): Promise<void> {
    
    
    if (!args[0]) {
        console.error("Please provide a pokemon name.");
        return;
    }
    const pokemon = args[0].toLowerCase();
    const PokemonURL = `https://pokeapi.co/api/v2/pokemon//${pokemon}`;

    if (pokemon in state.pokedex) {
        console.log(`${pokemon} has already been caught!`);
    }
    
    else {
        try {
            const PokemonDetail: Pokemon = await state.pokeObj.fetchPokemonDetails(PokemonURL);
            console.log(`Throwing a Pokeball at ${pokemon}...`);
            
            const baseExperience = PokemonDetail.base_experience;
            const catchResult: boolean = determineCatch(baseExperience);
            
            
            if (catchResult) {
                state.pokedex[pokemon] = PokemonDetail;
                console.log(`${pokemon} was caught!`);
            }
            else {
                console.log(`${pokemon} escaped!`)
            }
            
            
        } catch (e) {
            console.error("Error fetching pokemon details. Please try a different name");
        }
    }
}



function determineCatch(baseExperience: number,difficultyFactor: number = 0.01): boolean {
    const roll = Math.random();
    const catchProb = 1 / (1+ difficultyFactor * baseExperience);
    return roll < catchProb;
}