// jQuery TODO APP w/Firebase v1.01
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
        $("#fTodo").val("");
        $("#fBtn").attr("value", "Add");

        if (currTodoIndex !== -1) { // perform an UPDATE
            todoHolder[currTodoIndex].task = todoTask;
            currTodoIndex = -1;
            currTodo = null;
        } else { // perform an ADD

            if (todoTask !== "") { // if field is not empty
                var tempTodo = new Todo(todoTask, false);
                todoHolder.push(tempTodo);
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
    $("#ajaxCaller").click(function () {
        event.preventDefault(); // Prevent defualt browser action
        readCall();
    });

    // handle click event for Add to firebase
    $("#ajaxAddCaller").click(function () {
        event.preventDefault(); // Prevent defualt browser action
        addCall();
    });


    // Make AJAX call - to READ all data
    function readCall() {
        var myrequest = new XMLHttpRequest();
        myrequest.open("GET", "https://XYZ.firebaseio.com/.json", true);
        myrequest.onload = function () {
            if (this.status >= 200 && this.status < 400) { // success
                console.log("it was a success");
                console.log("DATA", this.response);
            } else { // problem
                console.log("there was a problem");
            }
        };
        myrequest.send();
    }

// make AJAX to add data

    function addCall() {
        var objToAdd = {};
        objToAdd.task = "become a coder";
        objToAdd.timeAdded = new Date();

        var myrequest = new XMLHttpRequest();
        myrequest.open("POST", "https://XYZ.firebaseio.com/.json", true);
        myrequest.onload = function () {
            if (this.status >= 200 && this.status < 400) { // success
                console.log("it was a success");
                console.log("DATA", this.response);
            } else { // problem
                console.log("there was a problem");
            }
        };
        var jsonToSend = JSON.stringify(objToAdd); // covert to string
        myrequest.send(jsonToSend); // send to firebase
    }

