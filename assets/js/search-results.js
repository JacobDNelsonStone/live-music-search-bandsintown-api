const urlParams = new URLSearchParams(window.location.search);
const qParam = urlParams.get('q');
const timeframeParam = urlParams.get('timeframe');
console.log(qParam);
console.log(timeframeParam);
