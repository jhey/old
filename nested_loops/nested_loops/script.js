// Multidimensional Array demo

var vCity, vCityLat, vCityLong, vSentence; // out put vars
var locs, len, vacations, vacationCities; // internal variable - locations array

vacationCities = [];
vacations = [
    ["austin", ["30.2500° N", "97.7500° W"]],
    ["Denver", ["39.7618° N", "104.8811° W"]],
    ["Atlanta", ["33.7550° N", "84.3900° W"]],
    ["boston", ["33.7550° N", "84.3900° W"]]
];

len = vacations.length;
for (var i = 0; i < len; i++) {
   
    vCity = vacations[i][0];  // grab the city
    locs = vacations[i][1]; // grab the locations
    
    vacationCities.push(vCity); // make array of city names only

    for (var ii = 0; ii < locs.length; ii++) {
        vCityLat = locs[0];
        vCityLong = locs[1];
    }
    vSentence = vCity + " is located at: " + vCityLat + " - " + vCityLong;
    //console.log(vSentence);
}


vacationCities.sort(function (a, b) {
    a = a.toLowerCase(); b = b.toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
});


var jedi, place;

jedi = {
    name: "Yoda"
};

place = {
    name: "Austin",
    visited: true,
    lat: "30.2500° N",
    long: "97.7500° W",
    annouce: function () {
        var visitedStr;
        if (this.visited) {
            visitedStr = "I HAVE visited: "
        } else {
            visitedStr = "I HAVE NOT visited: "
        }
        var str = visitedStr + this.name;
        console.log(str);
    }
};






