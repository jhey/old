//Add remove function to array Prototype
Array.prototype.remove = function (index) {
    return this.splice(index, 1);
}

//Wrapper Object to keep things out of global scope
var SpacePort = {};
//Array to hold Ships
SpacePort.ships = [];
SpacePort.baseUrl = 'portspace';
//Spaceship Constructor
SpacePort.Ship = function (name, affiliation, image) {
    this.name = name;
    this.affiliation = affiliation;
    this.image = image;
    this.isImpounded = false;
    this.id = null;
};

SpacePort.urlMaker = function (base) {
    var url = "https://" + base + ".firebaseio.com/"
    for (var i = 1; i < arguments.length; i++) {
        url += arguments[i] + "/"
    }
    
    return url + ".json";
}

SpacePort.createTableRow = function (currentShip) {
    var h = "";
    var display = "bg-info";

    var index = SpacePort.ships.indexOf(currentShip);

    if (currentShip.isImpounded) {
        display = "bg-danger";
    }
    h += "<div class='col-md-4 " + display + "' id='ship" + index + "' >";
    h += "<h1>";
    h += "<i class='" + SpacePort.getIconName(currentShip.affiliation) + "'></i> ";
    h += currentShip.name + "</h1><br/>";
    h += "<img src='" + currentShip.image + "' class='img-responsive img-thumbnail ship-image'/><br/>";
    if (currentShip.isImpounded) {
        h += "<div class='btn btn-danger fa fa-lock disabled'></div>";
    }
    else {
        h += "<div class='btn btn-danger fa fa-rocket' onclick='SpacePort.scrapShip(" + index + ")'></div>";
    }
    h += "<div class='btn btn-warning fa fa-edit' onclick='SpacePort.showEdit(" + index + ")'></div>"
    h += "</div>";

    return h;
};

SpacePort.appendHtmlToTable = function (html) {
    $("#shipTable .row").append(html);
};

SpacePort.removeRowFromTable = function (index) {
    $("#ship" + index).remove();
}

//Draw table to the page
SpacePort.drawTable = function () {
    var h = "<div class='container' id='shipTable'>";
    h += "<div class='row'>";
    for (var i in SpacePort.ships) {
        if (SpacePort.ships.hasOwnProperty(i)) {
            var display = "bg-info";
            var currentShip = SpacePort.ships[i];
            h += SpacePort.createTableRow(currentShip);
        }
    }
    h += "</div>";
    h += "</div>";
    document.getElementById("tableHolder").innerHTML = h;
};
//Helper Function to pull Icon Names
SpacePort.getIconName = function (affiliation) {
    if (affiliation === "Imperial") {
        return "fa fa-empire";
    }
    else if (affiliation === "Rebel") {
        return "fa fa-rebel";
    }
    else {
        return "fa fa-rocket";
    }

};
/***************** CRUD *******************************/
//Add Ships to array
SpacePort.addShip = function () {
    "use strict";
    var name, affiliation, image;
    name = document.getElementById("name");
    affiliation = document.getElementById("affiliation");
    image = document.getElementById("image");
    var s = new SpacePort.Ship(name.value, affiliation.value, image.value);
    
    image.value = "";
    name.value = "";

    SpacePort.firebaseHttpRequest("POST", SpacePort.urlMaker(SpacePort.baseUrl), s, function (data, ship) {
        s.id = data.name;
        SpacePort.ships.push(s);

        var html = SpacePort.createTableRow(s);
        SpacePort.appendHtmlToTable(html);
    });
};
//Delete Ship
SpacePort.scrapShip = function (index) {
    var ship = SpacePort.ships[index];

    SpacePort.firebaseHttpRequest("DELETE", SpacePort.urlMaker(SpacePort.baseUrl, ship.id), null, function (response, origData, status) {
        if (status == '200' || status == '204') {
            SpacePort.removeRowFromTable(index);
            SpacePort.ships.remove(index);
            //SpacePort.drawTable();
            
        }
    });
};
//Show Edit Ship
SpacePort.showEdit = function (index) {
    var ship = SpacePort.ships[index];
    document.getElementById("editTitle").innerHTML = "Ship information for the " + ship.name;
    document.getElementById("editName").value = ship.name;
    document.getElementById("editImage").value = ship.image;
    document.getElementById("editAffiliation").value = ship.affiliation;
    document.getElementById("editImpound").value = ship.isImpounded.toString();
    document.getElementById("saveChangesBtn").onclick = function () { SpacePort.saveEdit(index); };
    $("#editModal").modal();

};
//Save Edit Ship
SpacePort.saveEdit = function (index) {
    var ship = SpacePort.ships[index];
    ship.name = document.getElementById("editName").value;
    ship.image = document.getElementById("editImage").value;
    ship.affiliation = document.getElementById("editAffiliation").value;
    if (document.getElementById("editImpound").value ==="true") {
        ship.isImpounded = true;
    }
    else {
        ship.isImpounded = false;
    }

    console.log(ship.id);
    console.log( SpacePort.urlMaker(SpacePort.baseUrl, ship.id) );
    console.log(ship);
    
    
    SpacePort.firebaseHttpRequest("PUT", SpacePort.urlMaker(SpacePort.baseUrl, ship.id), ship);
    //SpacePort.ships[index].name = document.getElementById("editName").value;
    $("#editModal").modal("hide");
    SpacePort.drawTable();
};
/******************End CRUD****************************/
//Start Function
SpacePort.start = function () {
    SpacePort.firebaseHttpRequest("GET", SpacePort.urlMaker(SpacePort.baseUrl), null, function (data) {
        for (var x in data) {
            data[x].id = x;
            SpacePort.ships.push(data[x]);
        }

        //If there was no data from firebase, pre-load some ships and save them to firebase for next time
        if (SpacePort.ships.length == 0) {
            SpacePort.ships.push(new SpacePort.Ship("Millenium Falcon", "Other", "https://www.crestws.com/wp-content/uploads/Lego-Millenium-Falcon.jpg"));
            SpacePort.ships.push(new SpacePort.Ship("Shuttle", "Imperial", "http://cache.lego.com/e/dynamic/is/image/LEGO/10212?$main$"));
            SpacePort.ships.push(new SpacePort.Ship("Slave-1", "Other", "http://img1.wikia.nocookie.net/__cb20100822062932/lego/images/5/5b/Slave_1-2.png"));
            SpacePort.ships.push(new SpacePort.Ship("X-Wing", "Rebel", "/content/xwing.png"));

            for (var x in SpacePort.ships) {
                SpacePort.firebaseHttpRequest("POST", SpacePort.urlMaker(SpacePort.baseUrl), SpacePort.ships[x], function (response, ship) {
                        var data = JSON.parse(response);
                        ship.id = data.name;
                });
            }
        }

        SpacePort.drawTable();
    });
};
//Clear All
SpacePort.clearAll = function () {
    SpacePort.ships = [];
    SpacePort.drawTable();
};

//Firebase HTTP function
SpacePort.firebaseHttpRequest = function (verb, url, data, callback, extra) {
    //Instantiate a new XMLHttp request object
    var request = new XMLHttpRequest();
    //var firebaseUrl = verb === "PUT" || verb === "DELETE" ? "https://sweltering-torch-7921.firebaseio.com/" + data.id + ".json" : "https://sweltering-torch-7921.firebaseio.com/.json";
    //Puts Postage and Address on the envelope
    request.open(verb, url, true);
    //Defines what happens when the response loads
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            if (callback && typeof(callback) === "function")
                callback(JSON.parse(this.response), data, this.status);
        }
        else {
            console.log("Error " + this.status + ":" + this.response);
        }
    };
    //What happens if the request response load never occurs
    request.onerror = function () {
        console.log("Communication error");
    };

    //Sends the request
    if (data) {
        request.send(JSON.stringify(data));
    }
    else {
        request.send();
    }
}
//Run Start Function
window.onload = function () {
    SpacePort.start();
}
