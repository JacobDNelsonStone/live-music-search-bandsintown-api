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

    // If timeframeParam present, convert to SerpAPI format and add to url
    // date:today - Today's Events
    // date:tomorrow - Tomorrow's Events
    // date:week - This Week's Events
    // date:today - Today's Weekend's Events
    // date:next_week - Next Week's Events
    // date:month - This Month's Events
    // date:next_month - Next Month's Events

  switch(timeframeParam){
    case "today":
      url.searchParams.set("timeframe", "date:today");
      break;
    case "tomorrow":
      url.searchParams.set("timeframe", "date:tomorrow");
      break;
    case "week":
      url.searchParams.set("timeframe", "date:week");
      break;
    default:
      // noop
  }
  console.log(url.href);

  // Make API call
  // Parse result

  // Populate page
} else {
  alert("You must provide a search query.");
}
