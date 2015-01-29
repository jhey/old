// jQuery TODO APP w/Firebase v1.04
// Make sure DOM & jQuery are loaded...
$(function () {

    //
});


// Hold all of the TODO objects
var todoHolder = [];

// temp todo holder
var currTodo = null;

// Todo currently being edited - Index
// @ -1 = not editing, else is editing
var currTodoIndex = -1;

    // TODO constructor
    function Todo(task, completed, date) {
        this.task = task;
        this.completed = completed;
        this.timeAdded = date;
    }

    // handle events from the INPUT FORM...
    $("#todoForm").submit(function (event) {
        event.preventDefault(); // Prevent defualt browser action
        var todoTask = $("#fTodo").val();
        if (todoTask === "") { return }  // if field is not empty
        $("#fBtn").attr("value", "Add");
        if (currTodoIndex !== -1) { // perform an UPDATE
            updateTodoCall(); // update via ajax...
            currTodoIndex = -1;
            currTodo = null;
        } else { // perform an ADD
            addTodoCall();    
        }
        $("#fTodo").val("");
    });


    // DELETE Method for the todo
    function deleter(idClicked) {
        currTodoIndex = idClicked;
        deleteTodoCall();
    }

    // UPDATE Method for the todo
    function editTodo(idClicked) {
        currTodoIndex = idClicked;
        var tTask = todoHolder[currTodoIndex].task;
        $("#fTodo").val(tTask);
        $("#fBtn").attr("value", "Update");
        //
        console.log("clicked edit!!!", idClicked, todoHolder[currTodoIndex].id); 
    }

///////////////////////////// READ -  Make AJAX call - to READ all data
    function readTodoCall() {
        var myrequest = new XMLHttpRequest();
        myrequest.open("GET", "https://cccontact.firebaseio.com/.json", true);
        myrequest.onload = function () {
            if (this.status >= 200 && this.status < 400) { // success
                console.log("GET was a success");
                renderContent(this.response);
            } else { // problem
                console.log("there was a problem");
            }
        };
        myrequest.send();
    }
    readTodoCall();

    // render the firebase content to the screen
    function renderContent(tempData) {
        var firebaseData = JSON.parse(tempData);
        todoHolder = [];
        var counter = 0;
        $("#myList").empty();
        for (var i in firebaseData) { // parse the FBData into an Array
            console.log(i, firebaseData[i].task);
            //
            var len = todoHolder.length;
            var str;       // String for the Delete - STRING/HTML
            var idStr;     // String for the ID - NUMBER
            idStr = counter;
            // build object..
            var tdos = new Todo(firebaseData[i].task, firebaseData[i].completed, firebaseData[i].timeAdded);
            tdos.__proto__ = { id: i };
            todoHolder.push(tdos);
            // RENDER to view...
            str = "<a href='#' onclick='deleter(" + idStr + ")'>X</a>"
            $("#myList").append("<li id='a" + idStr + "'><a onclick='editTodo(" + idStr + ")' >" + firebaseData[i].task + "</a> - " + str + "</li>")
            counter++
        }
        console.log(todoHolder);
    }

///////////////////////////// CREATE - make AJAX to add data
    function addTodoCall() {
        var t_task = $("#fTodo").val();
        var t_complete = false;
        var t_date = new Date();
        var objToAdd = new Todo(t_task, t_complete, t_date);
        var myrequest = new XMLHttpRequest();
        myrequest.open("POST", "https://cccontact.firebaseio.com/.json", true);
        myrequest.onload = function () {
            if (this.status >= 200 && this.status < 400) { // success
                console.log("POST was a success", this.response);
                readTodoCall(); // Reload data after success
            } else { // problem
                console.log("there was a problem");
            }
        };
        var jsonToSend = JSON.stringify(objToAdd); // covert to string
        myrequest.send(jsonToSend); // send to firebase
    }

///////////////////////////// UPDATE - update the current item
    function updateTodoCall() {
        var objToAdd = new Todo($("#fTodo").val(), todoHolder[currTodoIndex].completed, todoHolder[currTodoIndex].timeAdded);
        console.log(objToAdd);
        var itemToUpdate = todoHolder[currTodoIndex].id;
        var putString = "https://cccontact.firebaseio.com/"+ itemToUpdate +"/.json"
        var myrequest = new XMLHttpRequest();
        myrequest.open("PUT", putString, false);
        myrequest.onload = function () {
            if (this.status >= 200 && this.status < 400) { // success
                console.log("PUT was a success", this.response);
                readTodoCall(); // Reload data after success
            } else { // problem
                console.log("there was a problem");
            }
        };
        var jsonToSend = JSON.stringify(objToAdd); // covert to string
        myrequest.send(jsonToSend); // send to firebase
    }

    ///////////////////////////// DELETE - delete the current item
    function deleteTodoCall() {
        var itemToUpdate = todoHolder[currTodoIndex].id;
        var putString = "https://cccontact.firebaseio.com/" + itemToUpdate + "/.json";
        var myrequest = new XMLHttpRequest();
        myrequest.open("DELETE", putString, true);
        myrequest.onload = function () {
            if (this.status >= 200 && this.status < 400) { // success
                console.log("DELETE was a success", this.response);
                readTodoCall(); // Reload data after success
            } else { // problem
                console.log("there was a problem");
            }
        };
        myrequest.send(); // send to firebase
    }
