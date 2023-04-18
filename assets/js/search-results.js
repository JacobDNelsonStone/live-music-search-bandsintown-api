
const apiKey = "X38h4l2eRNCHRxrc62dZS33WZp8kovpQ";
const urlParams = new URLSearchParams(window.location.search);
const qParam = urlParams.get('city');
console.log(qParam);
const searchResultsContainer = document.querySelector('#searchResults');
var searchresultCardArray = []

if(qParam){
  // CODE GOES HERE

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
        var searchResultCard = parseEvent(events[i]);

        searchResultCard.classList.add('saved');
        searchResultsContainer.append(searchResultCard);

      }
    })
    .catch(function (error) {
      console.error(error);
    });


  // Parse result
  function parseEvent(event) {
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
    searchResultCard.append(displayName(event));
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
    var eventDate = event["dates"]["start"]["dateTime"];
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
    var currency = event["priceRanges"][0]["currency"];
    var maxPrice = event["priceRanges"][0]["max"];
    var minPrice = event["priceRanges"][0]["min"];
    console.log(`${minPrice} ${currency} - ${maxPrice} ${currency}`);
    var priceRange = `${minPrice} ${currency} - ${maxPrice} ${currency}`;
    var priceRangeEl = document.createElement('p');
    priceRangeEl.append(priceRange);
    return priceRangeEl;
  }

  function displayUrl(event) {
    console.log(event["url"]);
    var eventURL = event["url"];
    var eventURLEl = document.createElement('p');
    eventURLEl.append(eventURL);
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
    displayVenueCity(venue);
    displayVenueState(venue);
    displayVenuePostalCode(venue);
    displayVenueCountryCode(venue);
    displayVenueCoordinates(venue);
    var venueAddressCard = document.createElement('div');
    venueAddressCard.classList.add('saved');
    venueAddressCard.append(dipslayVenueAddress(venue));

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

  function displayVenueCity(venue) {
    console.log(venue["city"]["name"]);
    // var venueCity = venue["city"]["name"];
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
  function renderResults(){
    
    
  }

} else {
  alert("You must provide a search query.");
}
