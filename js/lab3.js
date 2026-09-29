import * as model from "./model.js";
import searchView from "./views/SearchView.js";
import resultsView from "./views/ResultsView.js";

// TODO 1: DELETE resultsList, results(), and the resultsList click listener.
//         Keep: detailsContainer, state, and all the detail-panel code.

// CONTROLLERS

const resultsController = () => {
  // TODO 2: update the count, render the filtered listings,
  //         then re-mark the selected card
};

const selectController = (id) => {
  // TODO 3: save selectedId, find the listing (guard!),
  //         set occupants, mark the card, render the detail
};

const searchController = (term) => {
  model.setSearchTerm(term);
  // TODO 4: call the right controller
};

const maxRentController = (value) => {
  model.setMaxRent(value);
  // TODO 4
};

const init = () => {
  // TODO 5: subscribe every handler, then do the first render
};