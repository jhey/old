var app = angular.module("myApp", ["ngRoute"]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'app/views/home.html',
        controller: 'HomeController'
    })
    .when('/todos', {
        templateUrl: 'app/views/todos.html',
        controller: 'TodoController'

    })
    .when('/tweets', {
        templateUrl: 'app/views/tweets.html',
        controller: 'TweetsController'
    })

    .otherwise({
        redirectTo: '/'
    });

}]);