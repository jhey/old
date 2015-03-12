app.controller("TweetsController", function ($scope, $http, todoFactory) {
    $scope.tweets;
    $scope.getTweets = function () {
        $http({
            url: "https://chirptime.firebaseio.com/chirps/.json",
            method: "GET",
        }).success(function (data) {
            for (var i in data) {
                todoFactory.addTweet(data[i]);
            }
            $scope.tweets = todoFactory.getTweets();

        }).error(function (data) {
            alert(data);
        })
    }
});