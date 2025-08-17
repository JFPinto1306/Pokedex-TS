import {State} from "./state.js";
import {Pokemon, Stat, Type} from "./poke_api.js";

export async function commandInspect(state: State,...args: string[]) {

    if (!args[0]) {
        console.error("Please provide a pokemon name.");
        return;
    }
    const pokemonName = args[0].toLowerCase();
    
    if (pokemonName in state.pokedex) {
        const Pokemon:Pokemon = state.pokedex[pokemonName]
        const stats = Pokemon.stats;
        const types = Pokemon.types;

        // Log Name
        console.log(`Name: ${pokemonName}`);
        
        // Log Height and Weight 
        console.log(`\nHeight: ${Pokemon.height}`);
        console.log(`Weight: ${Pokemon.weight}`);
        
        // Log Stats
        console.log("\nStats:")
        for (const stat of stats) {
            console.log(` -${stat.stat.name}: ${stat.base_stat}`);
        }
        
        // Log Types
        console.log("\nTypes:")
        for (const type of types) {
            console.log(` -${type.type.name}`);
        }
    }
    else {
        console.log(`you have not caught that pokemon`)
    }
}

