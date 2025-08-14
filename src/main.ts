// repl.js actually refers to repl.ts
import { getCommands } from "./commands.js";
import { CLICommand, State, initState } from "./state.js";



async function main() {
  const stateObj: State = await initState();
}


main();