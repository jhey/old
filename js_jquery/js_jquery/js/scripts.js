// jQuery TODO APP w/Firebase v1.02
// Make sure DOM & jQuery are loaded...
$(function () {

    //
});


// Hold all of the TODO objects
var todoHolder = [];

// Todo currently being edited - Object
// @ null = not editing, else is editing
var currTodo = null;

// Todo currently being edited - Index
// @ -1 = not editing, else is editing
var currTodoIndex = -1;

    // TODO construcutor
    function Todo(task, completed) {
        this.task = task;
        this.competed = completed;
        this.timeAdded = new Date();
    }

    // handle form events...
    $("#todoForm").submit(function (event) {
        event.preventDefault(); // Prevent defualt browser action
        var todoTask = $("#fTodo").val();
        $("#fBtn").attr("value", "Add");

        if (currTodoIndex !== -1) { // perform an UPDATE
            todoHolder[currTodoIndex].task = todoTask;
            currTodoIndex = -1;
            currTodo = null;
        } else { // perform an ADD

            if (todoTask !== "") { // if field is not empty
                //var tempTodo = new Todo(todoTask, false);
                //todoHolder.push(tempTodo);
                //ajax...
                addTodoCall();
            }
            
        }
        showTodos();
    });

    // READ the contents of Array
    function showTodos() {
        $("#myList").empty();
        var len = todoHolder.length;
        var str;       // String for the Delete
        var idStr;     // String for the IDhbjb
        for (var i = 0; i < len; i++) { 
            idStr = i;
            str = "<a href='#' onclick='deleter("+idStr+")'>X</a>"
            $("#myList").append("<li id=a'" + idStr + "'><a onclick='editTodo(" + idStr + ")' >" + todoHolder[i].task + "</a> - " + str + "</li>")
        }
    }

    // DELETE Method for the todo
    function deleter(idClicked) {
        todoHolder.splice(idClicked, 1)
        showTodos();
    }

    // UPDATE Method for the todo
    function editTodo(idClicked) {
        currTodoIndex = idClicked;
        var editTodo = todoHolder[currTodoIndex];
        var task = editTodo.task;
        $("#fTodo").val(task);
        $("#fBtn").attr("value", "Update");
        console.log("clicked edit", task); 
    }


    // handle click event on link #fTrigger
    $("#fTrigger").click(function () {
        $("#todoForm").submit(); // submit form
    });
    // handle click event for link #hyper
    $("#hyper").click(function () {
        alert("this is hyper!");// alert
        $("#todoForm").submit(); // call the submit on #todoForm
    });


    // handle click event for link #ajaxCaller
    $("#ajaxCaller").click(function (event) {
        event.preventDefault(); // Prevent defualt browser action
        readTodoCall();
    });

    // handle click event for Add to firebase
    $("#ajaxAddCaller").click(function (event) {
        event.preventDefault(); // Prevent defualt browser action
        addTodoCall();
    });


    // Make AJAX call - to READ all data
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
        console.log(firebaseData);
        var counter = 0;
        $("#myList").empty();
        for (var i in firebaseData) {
            console.log(i, firebaseData[i].task);
            //
            var len = todoHolder.length;
            var str;       // String for the Delete
            var idStr;     // String for the IDhbjb
            
            idStr = counter;
            str = "<a href='#' onclick='deleter(" + idStr + ")'>X</a>"
            $("#myList").append("<li id=a'" + idStr + "'><a onclick='editTodo(" + idStr + ")' >" + firebaseData[i].task + "</a> - " + str + "</li>")
            //
            counter++
        }
    }

// make AJAX to add data

    function addTodoCall() {
        var objToAdd = {};
        objToAdd.task = $("#fTodo").val(); // grab text from field
        objToAdd.timeAdded = new Date();
        objToAdd.isCompleted = false;

        var myrequest = new XMLHttpRequest();
        myrequest.open("POST", "https://cccontact.firebaseio.com/.json", true);
        myrequest.onload = function () {
            if (this.status >= 200 && this.status < 400) { // success
                console.log("it was a success");
                console.log("DATA", this.response);
                // Reload data after success
                readTodoCall();
            } else { // problem
                console.log("there was a problem");
            }
        };
        var jsonToSend = JSON.stringify(objToAdd); // covert to string
        myrequest.send(jsonToSend); // send to firebase
    }

