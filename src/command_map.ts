import {State} from "./state.js";

export async function commandMap(state: State): Promise<void> {
    
    if (state.nextLocationsURL) {
        const locations = await state.pokeObj.fetchLocations(state.nextLocationsURL);
        
        // set obj prev and next location url
        state.prevLocationsURL = locations.previous;
        state.nextLocationsURL = locations.next
        
        // Log locations
        for (const location of locations.results) {
            console.log(location.name);
        }
        
    }
    else {
        console.log("No more areas to show.");
    }
};
