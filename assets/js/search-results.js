
const apiKey = "X38h4l2eRNCHRxrc62dZS33WZp8kovpQ";
const urlParams = new URLSearchParams(window.location.search);
const qParam = urlParams.get('city');
console.log(qParam);


if(qParam){
  // CODE GOES HERE

  // Make API call

  var url = new URL("https://app.ticketmaster.com/discovery/v2/events.json");
  console.log(url.href);
  url.searchParams.set("apikey", apiKey);
  console.log(url.href);
  url.searchParams.set("city", qParam);
  console.log(url.href);

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
        parseEvent(events[i]);
      }
    })
    .catch(function (error) {
      console.error(error);
    });


  // Parse result
  function parseEvent(event) {
    console.log("EVENT:");
    displayId(event);
    displayName(event);
    displayDates(event);
    displaySaleStatus(event);
    displayPriceRange(event);
    displayUrl(event);
    displayVenue(event["_embedded"]["venues"][0]);
  }

  function displayId(event) {
    console.log(event["id"]);
  }

  function displayName(event) {
    console.log(event["name"]);
  }

  function displayDates(event) {
    console.log(event["dates"]["start"]["dateTime"]);
  }

  function displaySaleStatus(event) {
    var saleStatusCode = event["dates"]["status"]["code"];
    var saleStatusIcon = saleStatusCode == "onsale" ? "✅" : "❌";
    console.log(`Sale status: ${saleStatusIcon}`);
  }

  function displayPriceRange(event) {
    var currency = event["priceRanges"][0]["currency"];
    var maxPrice = event["priceRanges"][0]["max"];
    var minPrice = event["priceRanges"][0]["min"];
    console.log(`${minPrice} ${currency} - ${maxPrice} ${currency}`);
  }

  function displayUrl(event) {
    console.log(event["url"]);
  }

  function displayVenue(venue) {
    console.log("VENUE:");
    displayVenueId(venue);
    displayVenueName(venue);
    displayVenueFullAddress(venue);
  }

  function displayVenueId(venue) {
    console.log(venue["id"]);
  }

  function displayVenueName(venue) {
    console.log(venue["name"]);
  }

  function displayVenueFullAddress(venue) {
    dipslayVenueAddress(venue);
    displayVenueCity(venue);
    displayVenueState(venue);
    displayVenuePostalCode(venue);
    displayVenueCountryCode(venue);
    displayVenueCoordinates(venue);
  }

  function dipslayVenueAddress(venue) {
    console.log(venue["address"]["line1"]);
    if(venue["address"]["line2"]){
      console.log(venue["address"]["line2"]);
    }
  }

  function displayVenueCity(venue) {
    console.log(venue["city"]["name"]);
  }

  function displayVenueState(venue) {
    console.log(venue["state"]["stateCode"]);
  }

  function displayVenuePostalCode(venue) {
    console.log(venue["postalCode"]);
  }

  function displayVenueCountryCode(venue) {
    console.log(venue["country"]["countryCode"]);
  }

  function displayVenueCoordinates(venue) {
    var latCoord = venue["location"]["latitude"];
    var lonCoord = venue["location"]["longitude"];
    console.log(`${latCoord}, ${lonCoord}`);
  }

  // Populate page
} else {
  alert("You must provide a search query.");
}
