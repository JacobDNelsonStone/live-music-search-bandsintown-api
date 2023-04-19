
var searchButton = document.querySelector('#searchButton');


function searchFieldSubmission() {

    var searchQuery = document.querySelector('#searchField').value;
    var startDate = document.querySelector('#startDate').value;
    var endDate = document.querySelector('#endDate').value;
    console.log(startDate + '|' + endDate);

    if ( !searchQuery ) {
        alert("You have to enter a search query.");
        location.reload()
    } else if (!startDate || !endDate) {

        var searchURLParams = './search-results.html?city=' + searchQuery;
        console.log(searchURLParams);
        location.assign(searchURLParams);
    } else {
        var searchURLParams = './search-results.html?city=' + searchQuery + '&startDateTime=' + startDate + '&endDateTime=' + endDate;
        console.log(searchURLParams);
        console.log(searchQuery);
        console.log(startDate + '|' + endDate);
        location.assign(searchURLParams);
    }
}

searchButton.addEventListener('click', function (event) {
    event.preventDefault()
    console.log(event.target)

    searchFieldSubmission();
})


// potential API Call for national events or something funnier

