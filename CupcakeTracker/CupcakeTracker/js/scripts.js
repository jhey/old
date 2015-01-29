// Cupcake Tracker v1.1 - Troop120


// Constructor function for Cupcake Deliveries
// name - customer name
// address - address where the item should be divers
// orderId - internal id of the order
// cost - cost of the order
// status - deliver or not
// dateOrdered - date order was placed
// agent - employee who took order
function Track(name, address, orderId, cost, status, dateOrdered, agent) {
    this.name = name;
    this.address = address;
    this.orderId = orderId;
    this.cost = cost;
    this.status = status;
    this.dateOrdered = dateOrdered;
    this.agent = agent;
};

// base url of your Firebase App
var baseUrl = "cccontact";

// URL maker helper function
var urlMaker = function(base){
    var url = "https://" + base + ".firebaseio.com/"
    for (var i = 1; i < arguments.length; i++) {
        url += arguments[i] + "/"
    }
    return url + ".json";
}
// Firebase Helper function for XMLHTTPREQUESTS
var fbXhr = function (verb, url, data, callback, extra) {
    var request = new XMLHttpRequest(); //Instantiate a new XMLHttp request object
    request.open(verb, url, true); //Puts Postage and Address on the envelope
    request.onload = function () { //Defines what happens when the response loads
        if (this.status >= 200 && this.status < 400) {
            if (callback && typeof (callback) === "function")
                callback(JSON.parse(this.response), data, this.status);
        } else {
            console.log("Error " + this.status + ":" + this.response);
        }
    };
    request.onerror = function () { //if the request response load never occurs
        console.log("Communication error");
    };
    if (data) { //Send request with Parameteres (CREATE, UPDATE, DELETE)
        request.send(JSON.stringify(data));
    } else { // Send request, (READ)
        request.send();
    }
}


// Sample order..
//var order001 = new Track("Joe Smith", "90210 York", 123, 199.99, "pending", "1/3/15", "Mgr Megan");

// Master object container
var masterOrder = [];

// ID of current object being edited
var currEditId = "";

// Handle form event - CREATE
$("#orderForm").submit(function (event) {
    event.preventDefault(); // Prevent defualt browser action

    var gName = $("#fCustomerName").val();
    var gAddress = $("#fCustomerAddress").val();
    var gOrderId = $("#fOrderId").val();
    var gCost = $("#fCost").val();
    var gStatus = $("#fStatus").val();
    var gDateOrdered = $("#fDate").val();
    var gAgent = $("#fAgent").val();

    var myOrder = new Track(gName, gAddress, gOrderId, gCost,gStatus,gDateOrdered,gAgent);
    console.log(myOrder);

    xhrCreate(myOrder);

});


// CREATE - send to firebase 
function xhrCreate(passedObj) {
    var myrequest = new XMLHttpRequest();
    myrequest.open("POST", "https://cccontact.firebaseio.com/.json", true);
    myrequest.onload = function () {
        if (this.status >= 200 && this.status < 400) { // success
            console.log("POST was a success", this.response);
            xhrRead(); // Reload data after success
        } else { // problem
            console.log("there was a problem");
        }
    };
    var jsonToSend = JSON.stringify(passedObj); // covert to string
    myrequest.send(jsonToSend); // send to firebase
}

// READ - read from firebase
function xhrRead(cbSuccess) {
    fbXhr("GET", urlMaker(baseUrl), null, cbSuccess)
}
// Callback with Parameter/Argument
function cbAfterRead(fbData) {
    console.log("MY CALLBACK METHOD", fbData);
    renderContent(fbData);
}
// Call the ajax w/ Anyoumous Function
xhrRead(function (tempData) {
    console.log("This is anonoymous");
    renderContent(tempData);
});

function fetchAllData() {
    //
}


function outPutData(param1, param2) {
    console.log("OUTPUTDATA", param1.agent, param2);
}
//masterOrder.forEach(outPutData);


// render the data to the screen
function renderContent(dataToParse) {
    var counter = 0; // 
    $("#myList").empty();

    for (var i in dataToParse) { // parse the FBData into an Array
        //console.log(i, dataToParse[i]);

        var len = masterOrder.length;
        var str;       // String for the Delete - STRING/HTML
        var idStr;     // String for the ID - NUMBER
        idStr = counter;

        // build out the TRACK object..
        var tmpObj = dataToParse[i];
        var trk = new Track(tmpObj.name,tmpObj.address,tmpObj.orderId,tmpObj.cost,tmpObj.status,tmpObj.dateOrdered,tmpObj.agent);
        trk.__proto__ = { id: i };

        // add newly constructed object to the MASTER ARRAY
        masterOrder.push(trk);

        // RENDER to view...
        str = "<a href='#' onclick='deleteTrack(" + idStr + ")'>X</a>"
        $("#myList").append("<li id='a" + idStr + "'><a onclick='editTrack(" + idStr + ")' >" + tmpObj.orderId + "</a> - " + str)
        $("#myList").append(" - " + tmpObj.name);
        $("#myList").append(" - " + tmpObj.address);
        $("#myList").append(" - " + tmpObj.cost);
        $("#myList").append(" - " + tmpObj.status);
        $("#myList").append(" - " + tmpObj.dateOrdered);
        $("#myList").append(" - " + tmpObj.agent);
        $("#myList").append("</li>");
        $("#myList").append("<hr>");

        //$("#myList").append("<li id='a" + idStr + "'><a onclick='editTodo(" + idStr + ")' >" + firebaseData[i].task + "</a> - " + str + "</li>")
        counter++


    }
}



// EDIT - user clicked edit
function editTrack(itemIndexClicked) {

    var currTrack = masterOrder[itemIndexClicked];
    currEditId = currTrack.id;

    $("#fCustomerName").val(currTrack.name);
    $("#fCustomerAddress").val(currTrack.address);
    $("#fOrderId").val(currTrack.orderId);
    $("#fCost").val(currTrack.cost);
    $("#fStatus").val(currTrack.status);
    $("#fDate").val(currTrack.dateOrdered);
    $("#fAgent").val(currTrack.agent);

    console.log(currTrack);
}

$("#fBtnUpdate").click(function (){
    xhrUpdate();
});
function xhrUpdate() {

    var gName = $("#fCustomerName").val();
    var gAddress = $("#fCustomerAddress").val();
    var gOrderId = $("#fOrderId").val();
    var gCost = $("#fCost").val();
    var gStatus = $("#fStatus").val();
    var gDateOrdered = $("#fDate").val();
    var gAgent = $("#fAgent").val();

    var myOrder = new Track(gName, gAddress, gOrderId, gCost, gStatus, gDateOrdered, gAgent);

    // HELPER function not working yet...
    //fbXhr("PUT", urlMaker(baseUrl, currEditId), myOrder, xhrRead);
    
    var customUrl = "https://cccontact.firebaseio.com/" + currEditId + ".json"
    var myrequest = new XMLHttpRequest();
    myrequest.open("PUT", customUrl, true);
    myrequest.onload = function () {
        if (this.status >= 200 && this.status < 400) { // success
            console.log("PUT was a success", this.response);
            xhrRead();
        } else { // problem
            console.log("there was a problem");
        }
    };
    var jsonToSend = JSON.stringify(myOrder); // covert to string
    myrequest.send(jsonToSend); // send to firebase
    
}

// DELETE - remove item from FireBase
function deleteTrack(itemIndexClicked) {
    var currTrack = masterOrder[itemIndexClicked];
    currEditId = currTrack.id;

    var customUrl = "https://cccontact.firebaseio.com/" + currEditId + ".json";

    var myrequest = new XMLHttpRequest();
    myrequest.open("DELETE", customUrl, true);
    myrequest.onload = function () {
        if (this.status >= 200 && this.status < 400) { // success
            var firebaseData = JSON.parse(this.response);
            console.log("DELETE was a success", firebaseData);
            xhrRead();
        } else { // problem
            console.log("there was a problem");
        }
    };
    myrequest.send(); // send to firebase

}


//Callback & Polling Lesson...

var friends = ["Dexter", "Chris", "Christian", "Jeremy", "Cody", "Justin", "Steven", "Dan"];

friends.forEach(function (eachName, index) {    //forEach executes the provided callback once for each element present in the array in ascending order.
    //console.log(index + 1 + ". " + eachName);
});

friends.forEach(traceName);
function traceName(parm1, parm2) {
    //console.log(parm1, parm2);
}

// Polling
var count = 0;
var foo = function () {
    count++;
    console.log(count, "CALLED setInterval/poll");


};
// Repeat
var timer = setInterval(foo, 2000);
// Run once - stop the repeat
var timeOut = setTimeout(function () { clearInterval(timer); }, 6000);
// this function will execute every 5 seconds.

// The first example of a closure passes the variable to a named function.
function startTimer() {
    var div = document.getElementById('currentTime');
    setTimeout(doClock(div),200);
}
// The second example also uses a closure, by referring to an argument passed to the function.
function doClock(obj) {
    setInterval(function(){obj.innerHTML=(new Date()).toLocaleString()},200);
}
startTimer();
