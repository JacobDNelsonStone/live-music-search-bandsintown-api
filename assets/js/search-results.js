const apiKey = "X38h4l2eRNCHRxrc62dZS33WZp8kovpQ";
const urlParams = new URLSearchParams(window.location.search);
const qParam = urlParams.get('city');
console.log(qParam);

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
    })
    .catch(function (error) {
      console.error(error);
    });

  // Parse result

  // Populate page
} else {
  alert("You must provide a search query.");
}
