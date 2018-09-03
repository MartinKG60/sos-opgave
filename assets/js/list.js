const app = angular.module("app", []);

app.controller("postsCtrl", function ($scope, $http) {
    $http.get('http://jsonplaceholder.typicode.com/posts').
    success(function (data) {
        $scope.posts = data;
    }).
    error(function (data) {
        console.log("Error: " + data);
    });
});

app.controller("bodiesCtrl", function ($scope, $http) {
    $http.get('http://jsonplaceholder.typicode.com/posts').
    success(function (data) {
        const items = data;
        let splitBodyText = [];

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const bodyText = item.body;
            splitBodyText.push(...bodyText.split(" "));
        }

        //console.log(splitBodyText);
        var countWords = filterBodies(splitBodyText);
        $scope.bodies = countWords;
    }).
    error(function (data) {
        console.log("Error: " + data);
    });
});

function filterBodies(original) {

    var compressed = [];
    // make a copy of the input array
    var copy = original.slice(0);

    // first loop goes over every element
    for (var i = 0; i < original.length; i++) {

        var myCount = 0;
        // loop over every element in the copy and see if it's the same
        for (var w = 0; w < copy.length; w++) {
            if (original[i] == copy[w]) {
                // increase amount of times duplicate is found
                myCount++;
                // sets item to undefined
                //delete copy[w];
            }
        }

        if (myCount > 4) {
            var a = new Object();
            a.value = original[i];
            a.count = myCount;
            compressed.push(a);
        }
    }

    return compressed;
};
