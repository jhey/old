app.factory('todoFactory', function () {

    var myTodos = [
        { task: "dishes", completed: false },
        { task: "carwash", completed: true }
    ];


    var getTodos = function () {
        return myTodos;
    }

    var pushTodo = function (data) {
        myTodos.push(data);
    }

    /////////////////////////////////////////////////////////
    // Get tweets...
    var myTweets = [];
    var addTweet = function (data) {
        myTweets.push(data)
    }
    var getTweets = function () {
        return myTweets;
    }

    return {
        getTodos: getTodos,
        pushTodo: pushTodo,
        addTweet: addTweet,
        getTweets: getTweets,
    }

});