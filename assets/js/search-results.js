const apiKey = "FAKEKEY";
const urlParams = new URLSearchParams(window.location.search);
const qParam = urlParams.get('q');
const timeframeParam = urlParams.get('timeframe');
console.log(qParam);
console.log(timeframeParam);

if(qParam){
  // CODE GOES HERE

  // Create query url
  // https://serpapi.com/search.json?
    // engine=google_events&
    // q=Minneapolis&
    // location=Minneapolis-St.+Paul%2C+MN%2C+United+States&
    // htichips=date%3Atoday&
    // api_key=

  var url = new URL("https://serpapi.com/search.json?engine=google_events&location=Minneapolis-St.+Paul%2C+MN%2C+United+States&api_key=" + apiKey);
  console.log(url.href);
  url.searchParams.set("q", qParam);
  console.log(url.href);
  if(timeframeParam){
    url.searchParams.set("timeframe", timeframeParam);
    console.log(url.href);
  }


  // Make API call
  // Parse result

  // Populate page
} else {
  alert("You must provide a search query.");
}
