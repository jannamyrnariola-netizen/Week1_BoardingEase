import * as model from "./model.js";
import searchView from "./views/SearchView.js";
import resultsView from "./views/ResultsView.js";
import detailView from "./views/DetailView.js";

let selectedId = null;
let selectedListing = null;

const computeBreakdown = (listing, occupants, includeFare) => {
  const clamped = Math.min(Math.max(occupants, 1), listing.maxOccupants);

  const utilitiesTotal =
    listing.estimatedUtilities.electricity +
    listing.estimatedUtilities.water +
    listing.estimatedUtilities.internet;

  const rent = listing.monthlyRent / clamped;
  const utilities = listing.utilitiesIncluded ? 0 : utilitiesTotal / clamped;
  const transport = includeFare ? listing.fareOneWay * 2 * 22 : 0;
  const total = rent + utilities + transport;

  return { occupants: clamped, rent, utilities, transport, total };
};

const resultsController = () => {
  searchView.renderCount(model.state.filtered.length);
  resultsView.render(model.state.filtered);
  if (selectedId) resultsView.markSelected(selectedId);
};

const selectController = (id) => {
  selectedId = id;

  const listing = model.state.filtered.find((l) => l.id === id);
  if (!listing) return;

  selectedListing = listing;
  resultsView.markSelected(id);
  detailView.render(listing);
  detailView.renderBreakdown(computeBreakdown(listing, listing.maxOccupants, true));
};

const searchController = (term) => {
  model.setSearchTerm(term);
  resultsController();
};

const maxRentController = (value) => {
  model.setMaxRent(value);
  resultsController();
};

const occupantsController = (value) => {
  if (!selectedListing) return;
  const includeFare = detailView.getIncludeFare();
  detailView.renderBreakdown(computeBreakdown(selectedListing, value, includeFare));
};

const fareController = (checked) => {
  if (!selectedListing) return;
  const occupants = detailView.getOccupants();
  detailView.renderBreakdown(computeBreakdown(selectedListing, occupants, checked));
};

const init = () => {
  searchView.addSearchHandler(searchController);
  searchView.addMaxRentHandler(maxRentController);
  resultsView.addSelectHandler(selectController);
  detailView.addOccupantsHandler(occupantsController);
  detailView.addFareHandler(fareController);

  resultsController();
};

init();