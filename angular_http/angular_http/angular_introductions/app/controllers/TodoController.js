app.controller("TodoController", function ($scope, $http, todoFactory) {

    $scope.myTodos = todoFactory.getTodos();


    $scope.myName = "Joe";
    $scope.currTodo = "";
    $scope.isEditing = false;
    $scope.myArray = ["Joe", "Susan", "Mike"];
    

    $scope.addTodo = function () {
        $scope.myTodos.push({ task: $scope.newTodo, completed: false });
        todoFactory.pushTodos({ task: $scope.newTodo, completed: false });
        $scope.newTodo = "";
    }
    $scope.deleteTodo = function (val) {
        $scope.myTodos.splice(val, 1)
    }
    // Update the todo
    $scope.updateTodo = function (val) {
        $scope.isEditing = true;
        $scope.currTodo = val;
        $scope.newTodo = $scope.myTodos[$scope.currTodo].task;
    }
    $scope.performUpdate = function () {
        $scope.myTodos[$scope.currTodo].task = $scope.newTodo;
        $scope.newTodo = "";
        $scope.isEditing = false;
    }


    $scope.testRun = function () {
        $http({
            //Verbs and URL goes here
            url: "https://cccontacts.firebaseio.com/.json",
            method: "GET",
        }).success(function (data) {
            
            console.log(data);
        }).error(function () {
            //Block of code on error
        });
    }


    


});