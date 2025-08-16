import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { CLICommand,State } from "./state.js";



export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit, 
    },
    explore: {
      name: "explore",
      description:"Lists all pokemon found in a location-area",
      callback:commandExplore,
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
  };
}