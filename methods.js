var methods = {};

methods.methodsToPass = function(){
var simpleArray = "I'm an array and here's all the shit I'm storing inside: " + [
"A pistol",
"some rum",
"and a guitar! "
]

var simpleObject = {
	message:'This is an object. ',
	language:'Written in JavaScript.'
};

var simpleVariable = "I'm a variable. ";


return simpleVariable + simpleArray + simpleObject.message + simpleObject.language;
};

exports.methods = methods;