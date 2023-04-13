var searchButton = document.querySelector('#searchbutton');


function searchFieldSubmission(){

    var searchQuery = document.querySelector('#searchField').value;
    var timingQuery = document.querySelector('#eventTiming').value;

    if(!searchQuery && !timingQuery) {
        alert("You have to enter a search query.");
        location.reload()
    } else if ( !timingQuery ) {

    var searchURLParams = './search-results.html/q=' + searchQuery;
    
    location.assign(searchURLParams); 
    } else {
        var searchURLParams = './search-results.html/q=' + searchQuery + '&timeframe=' + timingQuery;
    console.log(searchURLParams);
    console.log(searchURLParams);
    console.log(searchQuery);
    console.log(timingQuery);
    //location.assign(searchURLParams);
    }
}

searchButton.addEventListener('click', function(event){
    console.log(event.target)

    searchFieldSubmission();
})


// potential API Call for national events or something funnier