(() => {
  "use strict";

  const bustimeUrl = "https://bustime.mta.info/?search=";
  const locations = locations_data || {};
  const connections = connections_data || {};

  const originCards = document.querySelector("#origin-cards");
  const destinationCards = document.querySelector("#destination-cards");
  const optionCards = document.querySelector("#option-cards");
  const selectedOriginLabel = document.querySelector("#selected-origin-label");
  const selectedJourneyLabel = document.querySelector("#selected-journey-label");
  const noDestinations = document.querySelector("#no-destinations");
  const noOptions = document.querySelector("#no-options");

  let selectedOriginId = null;
  let selectedDestinationId = null;

  function getOptions(originId, destinationId) {
    const value = connections[originId]?.[destinationId];
    if (!value) return [];
    // Permit either a single option object or an array of options.
    return Array.isArray(value) ? value : [value];
  }

  function createCard({
    color,
    title,
    subtitle = "",
    meta = "",
    onClick,
    className = "",
    selectable = false,
    selected = false
  }) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice-card ${className} ${selected ? "is-selected" : ""}`.trim();
    if (selectable) button.setAttribute("aria-pressed", String(selected));
    button.style.setProperty("--card-color", color || "#64748b");
    button.addEventListener("click", onClick);

    const dot = document.createElement("span");
    dot.className = "card-color-dot";
    dot.setAttribute("aria-hidden", "true");

    const copy = document.createElement("span");
    copy.className = "card-copy";

    const heading = document.createElement("span");
    heading.className = "card-title";
    heading.textContent = title;
    copy.appendChild(heading);

    if (subtitle) {
      const sub = document.createElement("span");
      sub.className = "card-subtitle";
      sub.textContent = subtitle;
      copy.appendChild(sub);
    }

    const metadata = document.createElement("span");
    metadata.className = "card-meta";
    metadata.textContent = meta;

    const arrow = document.createElement("span");
    arrow.className = "card-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "›";

    button.append(dot, copy, metadata, arrow);
    return button;
  }

  function renderOrigins() {
    originCards.replaceChildren();
    Object.entries(locations).forEach(([locationId, location]) => {
      originCards.appendChild(createCard({
        color: location.color,
        title: location.name,
        className: "origin-card",
        selectable: true,
        selected: selectedOriginId === locationId,
        onClick: () => selectOrigin(locationId)
      }));
    });
  }

  function selectOrigin(originId) {
    if (!locations[originId]) return;
    selectedOriginId = originId;
    selectedDestinationId = null;
    selectedOriginLabel.textContent = `Starting from ${locations[originId].name}`;
    selectedJourneyLabel.textContent = "Choose a destination to see bus options.";
    renderOrigins();
    renderDestinations();
    renderOptions([]);
  }

  function renderDestinations() {
    destinationCards.replaceChildren();

    const destinationIds = Object.keys(connections[selectedOriginId] || {});
    const validDestinationIds = destinationIds.filter(id => locations[id]);
    noDestinations.hidden = validDestinationIds.length > 0;
    noDestinations.textContent = selectedOriginId
      ? "No destinations are connected to this location yet. Add entries to connections in data.js."
      : "Choose a starting point to see available destinations.";

    validDestinationIds.forEach(destinationId => {
      const destination = locations[destinationId];
      const options = getOptions(selectedOriginId, destinationId);

      destinationCards.appendChild(createCard({
        color: destination.color,
        title: destination.name,
        subtitle: options.length === 1
          ? options[0].busLine || "Bus"
          : options.length > 1
            ? `${options.length} bus options`
            : "No bus options configured",
        meta: selectedDestinationId === destinationId ? "Selected" : "Choose",
        selectable: true,
        selected: selectedDestinationId === destinationId,
        className: "compact-card destination-card",
        onClick: () => selectDestination(destinationId)
      }));
    });
  }

  function selectDestination(destinationId) {
    const options = getOptions(selectedOriginId, destinationId);
    if (!locations[destinationId]) return;
    selectedDestinationId = destinationId;
    renderDestinations();
    selectedJourneyLabel.textContent =
      `${locations[selectedOriginId].name} → ${locations[selectedDestinationId].name}`;
    renderOptions(options);
    if (options.length === 1) openOption(options[0]);
  }

  function renderOptions(options) {
    optionCards.replaceChildren();
    noOptions.hidden = options.length > 0;
    noOptions.textContent = selectedDestinationId
      ? "No bus options are configured for this connection yet. Add an option in data.js."
      : "Choose a destination to see bus options.";

    options.forEach((option, index) => {
      optionCards.appendChild(createCard({
        color: locations[selectedDestinationId]?.color,
        title: option.busLine || `Option ${index + 1}`,
        subtitle: option.stopName || "",
        meta: "Open arrivals",
        className: "compact-card option-card",
        onClick: () => openOption(option)
      }));
    });
  }

  function openOption(option) {
    const stopcode = (option.stopcode || "").trim();
    if (!stopcode) {
      window.alert(
        `This option (${option.busLine || option.id || "unnamed"}) needs an MTA stop code. ` +
        `Add its stopcode field in data.js.`
      );
      return;
    }

    try {
      const parsed = new URL(`${bustimeUrl}${encodeURIComponent(stopcode)}`);
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
        throw new Error("Unsupported URL protocol");
      }
      window.open(parsed.href, "_blank", "noopener,noreferrer");
    } catch {
      window.alert("Could not create an MTA Bus Time link for that stop code. Check it in data.js.");
    }
  }

  const homeId = Object.entries(locations).find(([id, location]) =>
    id.toLowerCase() === "home" || location.name?.toLowerCase() === "home"
  )?.[0];

  if (homeId) {
    selectOrigin(homeId);
  } else {
    renderOrigins();
    renderDestinations();
  }
})();
