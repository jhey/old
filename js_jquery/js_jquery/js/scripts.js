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
        event.preventDefault(); //
        var todoTask = $("#fTodo").val();
        $("#fTodo").val("");

        if (currTodoIndex !== -1) { //perform an UPDATE
            todoHolder[currTodoIndex].task = todoTask;
            currTodoIndex = -1;
            currTodo = null;
        } else { // perform an ADD
            var tempTodo = new Todo(todoTask, false);
            todoHolder.push(tempTodo);
        }
        showTodos();
    });

    // show the contents of Array
    function showTodos() {
        $("#myList").empty();
        var len = todoHolder.length;
        var str;       // String for the Delete
        var idStr;     // String for the ID
        for (var i = 0; i < len; i++) { 
            idStr = i;
            str = "<a href='#' onclick='deleter("+idStr+")'>X</a>"
            $("#myList").append("<li id=a'" + idStr + "'><a onclick='editTodo(" + idStr + ")' >" + todoHolder[i].task + "</a> - " + str + "</li>")
        }
    }

    // Delete the todo
    function deleter(idClicked) {
        todoHolder.splice(idClicked, 1)
        showTodos();
    }

// Edit the todo
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
