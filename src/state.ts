import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./poke_api.js";


export type CLICommand = {
  name: string;
  description: string;
  callback: (state:State) => Promise<void>;

};

export type State = {
  rl: Interface,
  commands: Record<string, CLICommand>;
  pokeObj: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
}

export async function initState(): Promise<State> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> Pokedex '
  });

  const commands = getCommands();
  const pokeObj = new PokeAPI();
  const prevLocationsURL = null;
  const nextLocationsURL = "https://pokeapi.co/api/v2/location-area/?offset=0&limit=20";

  const state: State = {
    rl: rl,
    commands: commands,
    pokeObj: pokeObj,
    prevLocationsURL: prevLocationsURL,
    nextLocationsURL: nextLocationsURL
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
        await state.commands[command].callback(state);
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


