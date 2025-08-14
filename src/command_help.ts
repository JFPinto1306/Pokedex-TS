import {CLICommand, State} from "./state.js";

export async function commandHelp(state: State): Promise<void> {
    console.log("Welcome to the Pokedex!\nUsage:");

    for (const commandName of Object.keys(state.commands)) {
        const command: CLICommand = state.commands[commandName];
        console.log(`${command.name}: ${command.description}`);
    }
}