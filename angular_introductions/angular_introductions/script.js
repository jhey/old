var app = angular.module("myApp", []);


app.controller("appCtrl", function ($scope) {
    $scope.myName = "Joe";
    $scope.currTodo = "";
    $scope.isEditing = false;
    $scope.myArray = ["Joe", "Susan", "Mike"];
    $scope.myTodos = [
        { task: "dishes", completed: false },
        { task: "carwash", completed: true } 
    ];

    $scope.addTodo = function () {
        $scope.myTodos.push({ task: $scope.newTodo, completed: false })
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
    

});
app.controller("bodyCtrl", function ($scope) {
    $scope.myName = "Susan";
});