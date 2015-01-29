

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
function xhrRead() {
    var myrequest = new XMLHttpRequest();
    myrequest.open("GET", "https://cccontact.firebaseio.com/.json", true);
    myrequest.onload = function () {
        if (this.status >= 200 && this.status < 400) { // success
            var firebaseData = JSON.parse(this.response);
            console.log("GET was a success", firebaseData);
            renderContent(firebaseData);
        } else { // problem
            console.log("there was a problem");
        }
    };
    myrequest.send(); // send to firebase
}
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
xhrRead();


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
