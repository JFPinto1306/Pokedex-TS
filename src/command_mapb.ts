import {State} from "./state.js";

export async function commandMapB(state: State): Promise<void> {
    
    if (state.prevLocationsURL) {
        const locations = await state.pokeObj.fetchLocations(state.prevLocationsURL);
        
        // set obj prev and next location url
        state.prevLocationsURL = locations.previous;
        state.nextLocationsURL = locations.next
        
        // Log locations
        for (const location of locations.results) {
            console.log(location.name);
        }
        
    }
    else {
        console.log("No previous areas to show.");
    }
};
