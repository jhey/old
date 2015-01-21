//"use strict";

// JS Variables Demo
//use strict

var myName = "7"; // String

var myAge = 3; // Number

var myNumber = myName + myAge;
//console.log(myNumber);

var isLoggedIn = true; //false // Boolean
//console.log(isLoggedIn);



if (isLoggedIn == false) {
    // Not logged in
    //console.log("Please log in");
} else {
    // Use is logged in
    //console.log("Don't forget to logout");
}

var nickName = "xyz" ;
if (nickName == undefined) {
    //console.log("that is undefined");
}

// Object
var person = {};
person.name = "joe";
person.age = 3;
person.favFood = "pizza";
person.myCmd = function () {
    console.log("hello world from person");
};

var person2 = {
    name: "joey",
    age: 7,
    favFood: "veggies"
};

var people = function () {
    return {
        name: "charles",
        age: 4
    }
}();



// Array
var myArray = [];
myArray.push("egg1");
myArray.push("egg2");


var myArray2 = ["dog1", "dog2", 12, 1, person];


// Functions....
function sayHello() {
    // exec...
    //console.log("hello");
}

function saySomething(str, strName) {
    var newStr = strName.toUpperCase();
    //console.log(str, newStr);
}
saySomething("Hello", "bob");

function addNumbers(v1, v2) {
    var newStr = v1 + v2;
    //console.log(newStr);
}
addNumbers(5, 5);



function argTest() {
    //console.log(arguments.length, arguments);

    var i, max = 0;
    for (i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) {
            max = arguments[i];
        }
    }
    return max;

}
//argTest("param1", "arg1", 3);

var xresult = argTest(1, 123, 500, 115, 44, 88);
//console.log(xresult);


// SCOPE...


var testName = "jane";

function hello() {
    var testName2 = "john";
    console.log(testName2);
}

//hello();
//console.log(testName2);
//hello();

function getLetters(slot) {
    var data = myArray2[slot];
    // go to web 
    return data;
}
var letters;
letters = getLetters(4);
//letters.myCmd();


//
// Paired Partner App
// Randdomly generate a list of Paired Students

//Populate Stundents Array
var students = [];
students.push("Brittney");
students.push("Biyanca");
students.push("Carrington");
students.push("Chase");
students.push("Chris A");
students.push("Chris R");
students.push("David");
students.push("Dneiqua");
students.push("Eduardo");
students.push("Kyle");
students.push("Mark");
students.push("Ryan");

//console.log(students.length);
//console.log(students);

// randomize our students
function randomizer(arr) {
    for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i),
        x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
}

var mixedArray = randomizer(students);
console.log(mixedArray);

// Split into 2 large groups
var studentsGroup1 = mixedArray.slice(0, 6);
var studentsGroup2 = mixedArray.slice(6, mixedArray.length);
//console.log(studentsGroup1);
//console.log(studentsGroup2);

// make pairs from the 2 large groups
for (var i = 0; i < studentsGroup1.length; i++) {
    var longStr = "Team #" + i + " " + studentsGroup1[i] + ", " + studentsGroup2[i];
    //console.log(longStr);
}

// 12
// 6 w/2 each 

var pairedStudents  = []; // paired list of students
var tempCounter     = 0;
var fixedlen = mixedArray.length

for (var i = 0; i < fixedlen; i++) {
    if (mixedArray.length == 0) {
        break;
    }
    var temp2 = mixedArray.splice(0, 2);
    //console.log(mixedArray.length, i, temp2);
    pairedStudents.push(temp2);

    var longStr = "Team #" + i + " " + temp2[0] + ", " + temp2[1];
    console.log(longStr);

}
//console.log(pairedStudents);

/*
Final Teams for Wed:
Team #0 Brittney, Carrington
Team #1 Chris A, Chase
Team #2 Dneiqua, Kyle
Team #3 Eduardo, Mark
Team #4 David, Chris R
Team #5 Ryan, Biyanca
*/



