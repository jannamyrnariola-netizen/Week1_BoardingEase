import View from "./View.js";

class DetailView extends View {
  _parentElement = document.querySelector(".detail");
  _errorMessage = "Select a listing to see the cost breakdown.";

  addOccupantsHandler(handler) {
    this._parentElement.addEventListener("input", (e) => {
      if (e.target.id !== "occupants-demo") return;
      handler(Number(e.target.value));
    });
  }

  addFareHandler(handler) {
    this._parentElement.addEventListener("change", (e) => {
      if (e.target.id !== "transport-demo") return;
      handler(e.target.checked);
    });
  }

  getOccupants() {
    return Number(this._parentElement.querySelector("#occupants-demo").value);
  }

  getIncludeFare() {
    return this._parentElement.querySelector("#transport-demo").checked;
  }

  renderBreakdown({ occupants, rent, utilities, transport, total }) {
    this._parentElement.querySelector("#occupants-demo").value = occupants;
    this._parentElement.querySelector("#rent-value").textContent = this._formatPeso(rent);
    this._parentElement.querySelector("#utilities-value").textContent = this._formatPeso(utilities);
    this._parentElement.querySelector("#transport-value").textContent = this._formatPeso(transport);
    this._parentElement.querySelector("#total-value").textContent = this._formatPeso(total);
  }

  _formatPeso(amount) {
    return `₱${Math.round(amount).toLocaleString("en-PH")}`;
  }

  _generateMarkup = () => {
    const { name, barangay, monthlyRent, maxOccupants } = this._data;

    return `
      <h2 class="detail__name">${name}</h2>
      <p class="detail__where">${barangay} &middot; &#8369;${monthlyRent} / month</p>

      <fieldset class="splitter">
        <legend class="splitter__legend">Split the cost</legend>

        <div class="splitter__row">
          <label for="occupants-demo">Sharing with</label>
          <input
            class="field__input"
            type="number"
            id="occupants-demo"
            min="1"
            max="${maxOccupants}"
            value="${maxOccupants}"
          />
        </div>

        <div class="splitter__row">
          <label for="transport-demo">Include daily fare</label>
          <input type="checkbox" id="transport-demo" checked />
        </div>
      </fieldset>

      <div class="breakdown">
        <p class="breakdown__line">
          <span>Rent</span><span id="rent-value"></span>
        </p>
        <p class="breakdown__line">
          <span>Utilities</span><span id="utilities-value"></span>
        </p>
        <p class="breakdown__line">
          <span>Transport</span><span id="transport-value"></span>
        </p>
        <p class="breakdown__total">
          <span>Per person</span><span id="total-value"></span>
        </p>
      </div>
    `;
  };
}

export default new DetailView();