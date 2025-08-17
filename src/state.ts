import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./poke_api.js";
import {Pokemon} from "./poke_api.js";


export type CLICommand = {
  name: string;
  description: string;
  callback: (state:State,...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface,
  commands: Record<string, CLICommand>;
  pokeObj: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  pokedex: Record<string,Pokemon>;
}

export async function initState(): Promise<State> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> Pokedex '
  });

  const commands = getCommands();
  const pokeObj = new PokeAPI(500);
  const prevLocationsURL = null;
  const nextLocationsURL = "https://pokeapi.co/api/v2/location-area/?offset=0&limit=20";
  const pokedex = {}

  const state: State = {
    rl: rl,
    commands: commands,
    pokeObj: pokeObj,
    prevLocationsURL: prevLocationsURL,
    nextLocationsURL: nextLocationsURL,
    pokedex: pokedex,
  };

  state.rl.prompt();

  state.rl.on("line",async (input) => {
    const words = cleanInput(input);
    if (words.length == 0) {
      rl.prompt();
    }

    
    // Processing Comand
    const command = words[0];
    if (command in state.commands) {
      try{
        await state.commands[command].callback(state,...words.slice(1));
      } catch(e) {
        console.log(e);
      }
    }
    else {
      console.log("Unknown command");
      rl.prompt();
    }

  })


  return state;

}
      
export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}


