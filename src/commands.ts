import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";
import { CLICommand,State } from "./state.js";



export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit, 
    },
    help: {
      name: "help",
      description: "Displays help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays the names of 20 location areas in the Pokemon world. Each subsequent call to map should display the next 20 locations, and so on.",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the names of the previous 20 location areas in the Pokemon world.",
      callback: commandMapB,
    },
    explore: {
      name: "explore",
      description:"Lists all pokemon found in a location-area",
      callback:commandExplore,
    },
    catch: {
      name: "catch",
      description:"Attempt to catch a Pokemon, adding it to your Pokedex.",
      callback:commandCatch,
    },
    inspect: {
      name: "inspect",
      description:"Inspect caught pokemon",
      callback:commandInspect,
    },
    pokedex: {
      name: "Pokedex",
      description:"List all caught pokemon",
      callback:commandPokedex,
    },
  };
}