let textbox = document.getElementById("text");

fetch(`https://serpapi.com/search?engine=google_events&q=minneapolis&apikey=ea1bb92f63fb6cd08bc63ef2a893d78f950f7d6fc900f274632b905582d14a03`)
.then(response=>response.json())
.then(data=>{
let info = data
console.log(info)
for(let i=0; i<5; i++)
{
    console.log(info[i]);
    // console.log(info.list[i].main.temp)
    // console.log(info.list[i].weather[0].description)
}
});