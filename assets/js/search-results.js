
const apiKey = "X38h4l2eRNCHRxrc62dZS33WZp8kovpQ";
const urlParams = new URLSearchParams(window.location.search);
const qParam = urlParams.get('city');
const startDateParam = "*"; // "YYYY-MM-DDT00:00:00"
const endDateParam = "*"; // "YYYY-MM-DDT23:59:59"
console.log(qParam);
const searchResultsContainer = document.querySelector('#searchResults');
const savedEventsContainer = document.querySelector('#savedEvents');
// var searchresultCardArray = []
var savedEventStorage = {};
const searchQueryInfo = $('#searchQueryInfo');

function getLocalStorage(){
  var storedEventsJson = localStorage.getItem("live-events-search-tm");
  if (storedEventsJson) {
    savedEventStorage = JSON.parse(storedEventsJson);
  }
}

function setLocalStorage(){
  var storedEventsJson = JSON.stringify(savedEventStorage);
  localStorage.setItem("live-events-search-tm", storedEventsJson);
}

if(qParam){
  // CODE GOES HERE
  getLocalStorage();
  var savedEventStorageIds = Object.keys(savedEventStorage);
  for(i=0;i<savedEventStorageIds.length;i++){
    savedEventRender(savedEventStorageIds[i], savedEventStorage[savedEventStorageIds[i]]);
  }

  var url = new URL("https://app.ticketmaster.com/discovery/v2/events.json");
  console.log(url.href);
  url.searchParams.set("apikey", apiKey);
  console.log(url.href);
  url.searchParams.set("city", qParam);
  url.searchParams.set("sort", "date,asc");
  url.searchParams.set("localStartEndDateTime", `${startDateParam},${endDateParam}`);
  console.log(url.href);

  searchQueryInfo.text(`Your Search: ${qParam}`);
  // Make API call
  fetch(url.href)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (locRes) {
      console.log(locRes);
      console.log(locRes["_embedded"]["events"]);
      var events= locRes["_embedded"]["events"];
      for(i=0;i<events.length;i++){
        var saveEventButton = document.createElement('button');
        saveEventButton.classList.add('btn');
        saveEventButton.classList.add('save-event-button');
        saveEventButton.textContent = 'Save Event';
        console.log(saveEventButton)
        var searchResultCard = parseEvent(events[i], saveEventButton);

        searchResultCard.classList.add('saved');
        searchResultsContainer.append(searchResultCard);
        

      }
    })
    .catch(function (error) {
      console.error(error);
    });


  // Parse result
  function parseEvent(event, saveEventButton) {
    console.log("===============================");
    console.log("EVENT:");
    
    displayId(event);
    // displayName(event);
    // displayDates(event);
    // displaySaleStatus(event);
    // displayPriceRange(event);
    // displayUrl(event);
    displayVenue(event["_embedded"]["venues"][0]);
    var searchResultCard = document.createElement('div');
    searchResultCard.setAttribute("data-id",event["id"]);
    searchResultCard.append(displayName(event));
    searchResultCard.append(saveEventButton);
    searchResultCard.append(displayDates(event));
    searchResultCard.append(displaySaleStatus(event));
    searchResultCard.append(displayPriceRange(event));
    searchResultCard.append(displayUrl(event));
    searchResultCard.append(displayVenue(event["_embedded"]["venues"][0]));
    return searchResultCard;
  }

  function displayId(event) {
    console.log(event["id"]);
  }

  function displayName(event) {
    console.log(event["name"]);
    var eventName = event['name'];
    var eventNameEl = document.createElement('h4');
    eventNameEl.append(eventName);
    return eventNameEl;
  }

  function displayDates(event) {
    console.log(event["dates"]["start"]["dateTime"]);
    var eventDate = dayjs(event["dates"]["start"]["dateTime"]).format('MMM D, YYYY');
    var eventDateEl = document.createElement('p');
    eventDateEl.append(eventDate);
    return eventDateEl;
  }

  function displaySaleStatus(event) {
    var saleStatusCode = event["dates"]["status"]["code"];
    var saleStatusIcon = saleStatusCode == "onsale" ? "✅" : "❌";
    console.log(`Sale status: ${saleStatusIcon}`);
    var saleStatus = `Sale status: ${saleStatusIcon}`;
    var saleStatusEl = document.createElement('p');
    saleStatusEl.append(saleStatus);
    return saleStatusEl;
  }

  function displayPriceRange(event) {
    if (event["priceRanges"]){
      var currency = event["priceRanges"][0]["currency"];
      var maxPrice = event["priceRanges"][0]["max"];
      var minPrice = event["priceRanges"][0]["min"];
      console.log(`${minPrice} ${currency} - ${maxPrice} ${currency}`);
      var priceRange = `${minPrice} ${currency} - ${maxPrice} ${currency}`;
    } else {
      var priceRange = "(no cost)";
    }
    var priceRangeEl = document.createElement('p');
    priceRangeEl.append(priceRange);
    return priceRangeEl;
  }

  function displayUrl(event) {
    console.log(event["url"]);
    var eventURL = event["url"];
    var eventURLEl = document.createElement('a');
    eventURLEl.setAttribute("href", eventURL);
    eventURLEl.setAttribute("target", "_blank");
    eventURLEl.textContent = "View on Ticketmaster";
    return eventURLEl;
  }

  function displayVenue(venue) {
    console.log("VENUE:");
    displayVenueId(venue);
    // displayVenueName(venue);
    displayVenueFullAddress(venue);
    var venueInfoCard = document.createElement('div')
    venueInfoCard.classList.add('saved')
    venueInfoCard.append(displayVenueName(venue));
    venueInfoCard.append(displayVenueFullAddress(venue));
    return venueInfoCard;
  }

  function displayVenueId(venue) {
    console.log(venue["id"]);
  }

  function displayVenueName(venue) {
    console.log(venue["name"]);
    var venueName = venue["name"];
    var venueNameEl = document.createElement('h5');
    venueNameEl.append(venueName);
    return venueNameEl;
  }

  function displayVenueFullAddress(venue) {
    // dipslayVenueAddress(venue);
    // displayVenueCity(venue);
    // displayVenueState(venue);
    // displayVenuePostalCode(venue);
    // displayVenueCountryCode(venue);
    displayVenueCoordinates(venue);
    var venueAddressCard = document.createElement('div');
    venueAddressCard.classList.add('saved');
    venueAddressCard.classList.add('venue-info');
    venueAddressCard.append(dipslayVenueAddress(venue));
    venueAddressCard.append(displayVenueCityState(venue));
    // venueAddressCard.append(displayVenueState(venue));
    venueAddressCard.append(displayVenuePostalCode(venue));
    venueAddressCard.append(displayVenueCountryCode(venue));
    venueAddressCard.append(displayVenueGoogleMap(venue));
    venueAddressCard.append(displayVenueGoogleMapLink(venue));
    
    return venueAddressCard;
  }

  function dipslayVenueAddress(venue) {
    console.log(venue["address"]["line1"]);
    if(venue["address"]["line2"]){
      console.log(venue["address"]["line2"]);
    }
    var venueAddress = venue["address"]["line1"] 
    if(venue["address"]["line2"]){
     venueAddress += "\n" + venue["address"]["line2"];
    }
    var venueAddressEl = document.createElement('p');
    venueAddressEl.append(venueAddress);
    return venueAddressEl;
  }

  function displayVenueCityState(venue) {
    console.log(venue["city"]["name"]);
    var venueCity = venue["city"]["name"];
    var venueState = venue["state"]["stateCode"];
    var venueCityStateEl = document.createElement('p')
    // var venueStateEl = document.createElement('p');
    venueCityStateEl.append(venueCity + `, ${venueState}`);
    return venueCityStateEl;
  }

  function displayVenueState(venue) {
    console.log(venue["state"]["stateCode"]);
    
    return venueStateEl;
  }

  function displayVenuePostalCode(venue) {
    console.log(venue["postalCode"]);
    var venueZipCode = venue["postalCode"];
    var venueZipCodeEl = document.createElement('p');
    venueZipCodeEl.append(venueZipCode);
    return venueZipCodeEl;
  }

  function displayVenueCountryCode(venue) {
    console.log(venue["country"]["countryCode"]);
    var venueCountry = venue["country"]["countryCode"];
    var venueCountryEl = document.createElement('p');
    venueCountryEl.append(venueCountry);
    return venueCountryEl;
  }

  function displayVenueCoordinates(venue) {
    var latCoord = venue["location"]["latitude"];
    var lonCoord = venue["location"]["longitude"];
    console.log(`${latCoord}, ${lonCoord}`);
  }

  // Modified from https://www.maps.ie/create-google-map/
  function displayVenueGoogleMap(venue) {
    var venueName = venue["name"];
    var latCoord = venue["location"]["latitude"];
    var lonCoord = venue["location"]["longitude"];
    var venueGMapIframeEl = document.createElement("iframe");
    venueGMapIframeEl.setAttribute("width", 200);
    venueGMapIframeEl.setAttribute("height", 200);
    venueGMapIframeEl.setAttribute("frameborder", 0);
    venueGMapIframeEl.setAttribute("scrolling", "no");
    venueGMapIframeEl.setAttribute("marginheight", 0);
    venueGMapIframeEl.setAttribute("marginwidth", 0);
    venueGMapIframeEl.setAttribute("src","https://maps.google.com/maps?width=200&height=200&hl=en&q="+latCoord+","+lonCoord+"+("+venueName+")&t=&z=14&ie=UTF8&iwloc=B&output=embed");
    return venueGMapIframeEl;
  }

  function displayVenueGoogleMapLink(venue) {
    var latCoord = venue["location"]["latitude"];
    var lonCoord = venue["location"]["longitude"];
    var venueGMapAEl = document.createElement("a");
    venueGMapAEl.setAttribute("href","https://www.google.com/maps/search/?api=1&query="+latCoord+","+lonCoord);
    venueGMapAEl.setAttribute("target","_blank");
    venueGMapAEl.textContent = "View on Google Maps";
    return venueGMapAEl;
  }

  // Populate page
  function savedEventRender(id, array){
    var savedEventCard = document.createElement('div')
    savedEventCard.setAttribute("data-id", id);
    var savedEventName = array[0];
    var savedEventNameEl = document.createElement('h4')
    savedEventNameEl.append(savedEventName);
    var savedEventDate = array[1];
    var savedEventDateEl = document.createElement('p');
    var savedEventUrl = array[2];
    var savedEventUrlEl = document.createElement('a');
    savedEventUrlEl.setAttribute("href", savedEventUrl);
    savedEventUrlEl.setAttribute("target", "_blank");
    savedEventUrlEl.textContent = "View on Ticketmaster";
    var savedEventTrashEl = document.createElement('p');
    savedEventTrashEl.textContent = "🗑️";
    savedEventTrashEl.classList.add("delete-event-button");
    savedEventDateEl.append(savedEventDate);
    savedEventCard.append(savedEventNameEl);
    savedEventCard.append(savedEventDateEl);
    savedEventCard.append(savedEventUrlEl);
    savedEventCard.append(savedEventTrashEl);
    savedEventCard.classList.add('saved');
    savedEventsContainer.append(savedEventCard);
       
  }

} else {
  alert("You must provide a search query.");
}


$(document).on('click', '.save-event-button', function(e){
  e.preventDefault();
  console.log(e.target.parentNode.children[0]);
  console.log(e.target.parentNode.children[2]);
  console.log(e.target.parentNode.children[5]);
  var savedEventId = e.target.parentNode.getAttribute("data-id");
  console.log(savedEventId);
  var savedEventName = e.target.parentNode.children[0].textContent;
  var savedEventDate = e.target.parentNode.children[2].textContent;
  var savedEventUrl = e.target.parentNode.children[5].getAttribute('href');
  var savedEventArray = [savedEventName, savedEventDate, savedEventUrl];
  if(!savedEventStorage[savedEventId]){
    savedEventStorage[savedEventId] = savedEventArray;
    setLocalStorage();
    savedEventRender(savedEventId, savedEventArray);
  }
  return savedEventArray;

})

$(document).on('click', '.delete-event-button', function(e){
  e.preventDefault();
  console.log(e.target);
  var deleteEventId = e.target.parentNode.getAttribute("data-id");
  delete savedEventStorage[deleteEventId];
  setLocalStorage();
  e.target.parentNode.remove();
})
